import { environment } from "@environments/environment";

export const config = {
  API_BASE_URL: environment.API_BASE_URL,
  ASSETS_PATH: "./assets",

  RESPONSE_CODE_SUCCESS: "0",
  RESPONSE_CODE_SESSION_EXPIRED: "SESSION",

  DELAY_TIME_RECALL_API: 1000 * 10, // minutes
  RETRY_CALL_API: 10000, // retry 3 time on error

  DEFAULT_TIMEOUT: 10000,
  DELAY_PRELOAD_STRATEGY: 5000,
  DEBOUNCE_TIME_WINDOW_RESIZE: 200,

  BROWSER_TAB_TITLE_DELIMITER: " - ",
  PROJECT_NAME: environment.PROJECT_NAME,

  DEFAULT_LANGUAGE: environment.DEFAULT_LANGUAGE,

  MAT_SNACK_DURATION: 5000,
} as const;
