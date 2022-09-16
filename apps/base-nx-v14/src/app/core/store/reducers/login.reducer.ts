import * as loginActions from "../actions";
import { loginSuccess } from "../actions";
import { HttpErrorResponse } from "@angular/common/http";
import jwt_decode from "jwt-decode";
import { Token } from "../../../../public/models/auth/token.model";
import { config } from "@core/common/constants/config";
import { Auth } from "../../../../public/models";
import { createReducer, on } from "@ngrx/store";

export interface LoginState {
  authorization: Auth;
  loginProcess: string;
  loginError: HttpErrorResponse | null;
  coreToken?: string;
  customerMobile?: string;
}

export const LOGIN_INITIAL_STATE: LoginState = {
  authorization: {
    token: "",
    authorities: [],
    customerId: "",
    exp: 0,
  },
  loginProcess: "",
  loginError: null,
};

export const loginReducer = createReducer(
  LOGIN_INITIAL_STATE,
  on(loginActions.loginSignIn, (state, { payload }) => ({
    ...state,
    loginProcess: "Process login",
    customerMobile: payload.username,
  })),

  on(loginSuccess, (state, { payload }) => {
    if (
      !payload ||
      !payload.responseCode ||
      payload.responseCode !== config.RESPONSE_CODE_SUCCESS
    ) {
      return state;
    }

    const decodedResult: Token = jwt_decode(payload.result?.token);
    const author: Auth = {
      token: payload.result?.token,
      exp: decodedResult.exp,
      customerId: decodedResult.sub,
      authorities: decodedResult.authorities,
    };
    return {
      ...state,
      authorization: author,
      loginProcess: "Login success",
      loginError: null,
    };
  }),

  on(loginActions.logoutSignOut, (state) => ({
    ...state,
    loginProcess: "",
    loginError: null,
    coreToken: "",
  })),

  on(loginActions.loginError, (state, { payload }) => ({
    ...state,
    loginError: payload,
    loginProcess: "Login failed",
  })),

  on(loginActions.resetToken, (state) => ({
    ...state,
    authorization: {},
  })),

  on(loginActions.refreshTokenSuccess, (state, { payload }) => {
    console.log("payload", payload);
    return {
      ...state,
      authorization: {
        ...state.authorization,
        token: payload,
      },
    };
  })
);
