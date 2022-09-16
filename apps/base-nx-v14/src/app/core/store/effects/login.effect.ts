import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, switchMap, tap } from "rxjs/operators";
import * as fromActions from "../actions";
import {
  loginError,
  loginSignIn,
  loginSuccess,
  logoutSignOut,
  resetToken,
} from "../actions";
import { Store } from "@ngrx/store";
import { AppState } from "../index";
import { of, Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { LoginForm } from "../../../../public/models";
import { NgxPermissionsService } from "ngx-permissions";
import { MultiLanguageService } from "@app/share/translate";

@Injectable()
export class LoginEffects {
  subManager = new Subscription();

  constructor(
    private _actions$: Actions,
    private _store$: Store<AppState>,
    private _router: Router,
    private _location: Location,
    private _multiLanguageService: MultiLanguageService,
    private _notifier: ToastrService,
    private _permissionsService: NgxPermissionsService
  ) {}

  logoutSignOut$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(logoutSignOut),
        tap(() => {
          this._store$.dispatch(resetToken({}));
          this._permissionsService.flushPermissions();
          this._router.navigateByUrl("/auth/sign-in").then();
        })
      ),
    { dispatch: false }
  );

  loginSignIn$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(loginSignIn),
        map((action) => action.payload)
        // exhaustMap((login: LoginForm) => {
        //   const { username, password } = login;
        //   // call api here
        // })
      ),
    { dispatch: false }
  );

  loginSinginSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(loginSuccess),
        // map((action) => action.payload),
        switchMap((action) => action.payload),
        tap(() => {
          this._router.navigateByUrl("/").then();
        })
      ),
    { dispatch: false }
  );

  loginSignInError$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(loginError),
        tap((errorCode: any) => {
          this._notifier.error(
            this._multiLanguageService.instant("common.something_went_wrong")
          );
        })
      ),
    { dispatch: false }
  );
}
