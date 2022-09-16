import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromSelectors from "../store/selectors";

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  private accessToken$: Observable<string | undefined>;
  private authorization = "";

  constructor(private _store: Store<{ accessToken: string }>) {
    this.accessToken$ = _store.select(fromSelectors.getTokenState);
    this.accessToken$.subscribe((token) => {
      if (token) this.authorization = token;
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("HttpRequest", request);

    if (
      !request.url.includes("/sign-in") ||
      !request.url.includes("/refresh-token") ||
      !request.url.includes("/get-token")
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authorization}`,
        },
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      });
    }

    return next.handle(request);
  }
}
