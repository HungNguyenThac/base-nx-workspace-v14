import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "../reducers";
import { RouterReducerState } from "@ngrx/router-store";

/**
 * Selectors
 */

export const getRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>("routerReducer");

export const getRouterAllState = createSelector(
  getRouterState,
  (routerData: { state: RouterStateUrl; navigationId: number }) => {
    return routerData.state;
  }
);

export const getRouterParams = createSelector(
  getRouterState,
  (routerData: { state: RouterStateUrl; navigationId: number }) => {
    return routerData.state.params;
  }
);

export const getRouterQueryParams = createSelector(
  getRouterState,
  (routerData: { state: RouterStateUrl; navigationId: number }) => {
    return routerData.state.queryParams;
  }
);

export const getRouterCurrentUrl = createSelector(
  getRouterState,
  (routerData: { state: RouterStateUrl; navigationId: number }) => {
    return routerData.state.url;
  }
);
