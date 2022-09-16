export const configRoutes = {
  APP_ROUTING: {
    PATH: "",
    AUTH_ROUTING: "auth",
    NOT_FOUND: "**",
  },
  AUTH_ROUTING: {
    PATH: "",
    CHILDREN: {
      LOGIN: "sign-in",
      REGISTER: "register",
    },
  },
} as const;
