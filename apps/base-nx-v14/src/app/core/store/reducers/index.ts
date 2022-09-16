import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromRouter from "@ngrx/router-store";
import * as fromRouterReducers from "./router.reducer";
import * as fromLoginReducers from "./login.reducer";

export * from "./router.reducer";

// Feature by core module
export interface AppState {
  login: fromLoginReducers.LoginState;
  routerReducer: fromRouter.RouterReducerState<fromRouterReducers.RouterStateUrl>;
}

export const CORE_INITIAL_STATE: AppState = {
  login: {
    authorization: {},
    loginProcess: "",
    loginError: null,
  },
  routerReducer: {
    state: {
      url: "",
      params: {},
      queryParams: {},
    },
    navigationId: 0,
  },
};

export const reducers: ActionReducerMap<AppState> = {
  login: fromLoginReducers.loginReducer,
  routerReducer: fromRouter.routerReducer,
};
