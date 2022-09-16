import { AppState } from "../reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";

// selectors

export const getCoreState = createFeatureSelector<AppState>("core");

export const getTokenState = createSelector(getCoreState, (state: AppState) => {
  return state.login.authorization ? state.login.authorization?.token : "";
});
