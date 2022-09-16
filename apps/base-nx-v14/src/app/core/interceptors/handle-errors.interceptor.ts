import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { catchError, delay, EMPTY, Observable, of, retryWhen, switchMap, take, tap } from "rxjs";
import { config } from "@core/common/constants/config";
import { ToastrService } from "ngx-toastr";
import { LoadingService } from "@core/services/loading.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Store } from "@ngrx/store";
import { logoutSignOut, refreshTokenSuccess } from "@core/store";
import { get } from "lodash";
import { MatSnackBar } from "@angular/material/snack-bar";
import { baseHttpResponse } from "@app/share/interface";
import { MultiLanguageService } from "@app/share/translate";

@Injectable()
export class HandleErrorsInterceptor implements HttpInterceptor {
  ErrorStatusRetry = [408, 500, 502, 503, 504, 522, 524];

  constructor(
    private _router: Router,
    private _location: Location,
    private _store: Store<{ accessToken: string }>,
    private _loading: LoadingService,
    private _multiLanguageService: MultiLanguageService,
    private _notifier: ToastrService,
    private _http: HttpClient,
    private _matSnack: MatSnackBar
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // check domain
    if (request.url.startsWith(config.API_BASE_URL)) {
      return next.handle(request).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) return this._handleError(request, next, error);

          this._notifier.error(this._multiLanguageService.instant("common.something_went_wrong"));

          return of(null);
        })
      );
    } else {
      return next.handle(request);
    }
  }

  private _handleError(request: HttpRequest<any>, next: HttpHandler, err: HttpErrorResponse): Observable<any> {
    this._loading.next(false);

    // retry on error
    if (this.ErrorStatusRetry.includes(err.status)) {
      return this.handleRetryWhenErrors(request, next, err);
    }

    // not retry on error
    this._notifier.error(err?.error?.message);

    const objectFnHandleErrors = {
      400: this.badRequest(err),
      401: this.unAuthorized(request, next),
      403: this.permissionDenied(err),
    };

    const mapHandleErrors = new Map(Object.entries(objectFnHandleErrors));

    return mapHandleErrors.get(err.status.toString()) ?? of(err);
  }

  unAuthorized = (request: HttpRequest<any>, next: HttpHandler) => {
    return this._reFreshToken(request, next);
  };

  badRequest = (err: HttpErrorResponse) => {
    return of(err);
  };

  permissionDenied = (err: HttpErrorResponse) => {
    this._location.back();
    return of(err);
  };

  private _reFreshToken = (request: HttpRequest<any>, next: HttpHandler): Observable<any> => {
    return this._http
      .post(
        `${config.API_BASE_URL}/refresh-token`,
        {
          refreshToken: "example",
        },
        { withCredentials: true }
      )
      .pipe(
        switchMap((res: baseHttpResponse) => {
          if (!res || res.codeSuccess != config.RESPONSE_CODE_SUCCESS) {
            this._store.dispatch(logoutSignOut({}));
            const message = get(res, "resultDesc", null) || "error";
            this._notifier.error(message);
            return EMPTY;
          }

          this._store.dispatch(refreshTokenSuccess({ payload: res.token }));
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${res.token}`,
            },
          });
          return next.handle(request);
        })
      );
  };

  handleRetryWhenErrors = (request: HttpRequest<any>, next: HttpHandler, err: HttpErrorResponse) =>
    next.handle(request).pipe(
      retryWhen((errors) =>
        errors.pipe(
          tap(() => this._matSnack.open(err.message, "")),
          tap(() => this._notifier.error(err?.message)),
          delay(config.DELAY_TIME_RECALL_API),
          take(config.RETRY_CALL_API)
        )
      ),
      catchError((err) => of(err))
    );
}
