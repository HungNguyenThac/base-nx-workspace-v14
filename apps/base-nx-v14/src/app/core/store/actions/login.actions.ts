import { ActionType, createAction, props } from "@ngrx/store";
import { LoginForm } from "../../../../public/models";

export const LOGIN_SIGNIN = "@Login/signin";
export const LOGIN_SIGNIN_ERROR = "@Login/signin/error";
export const LOGIN_SIGNIN_SUCCESS = "@Login/signin/success";
export const LOGIN_SIGN_OUT = "@Login/logout";
export const LOGIN_RESET_TOKEN = "@Login/reset/token";
export const REFRESH_TOKEN_SUCCESS = "@Refresh/token/success";

export const loginSignIn = createAction(
  LOGIN_SIGNIN,
  props<{
    payload: LoginForm;
  }>()
);

export const logoutSignOut = createAction(
  LOGIN_SIGN_OUT,
  props<{ payload?: any }>()
);

export const resetToken = createAction(
  LOGIN_RESET_TOKEN,
  props<{
    payload?: any;
  }>()
);

export const loginError = createAction(
  LOGIN_SIGNIN_ERROR,
  props<{
    payload?: any;
  }>()
);

export const loginSuccess = createAction(
  LOGIN_SIGNIN_SUCCESS,
  props<{
    payload: any;
  }>()
);

export const refreshTokenSuccess = createAction(
  REFRESH_TOKEN_SUCCESS,
  props<{ payload: any }>()
);

// export type LoginActions =
//   | ActionType<typeof loginSignin>
//   | ActionType<typeof logoutSignout>
//   | ActionType<typeof resetToken>
//   | ActionType<typeof loginSuccess>
//   | ActionType<typeof loginError>;
