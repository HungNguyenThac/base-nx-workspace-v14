import { Routes } from "@angular/router";
import { pagesTitle } from "@core/common/constants/pages-title";
import { configRoutes } from "@core/common/constants/routes-config";

export const authRoutes: Routes = [
  {
    path: configRoutes.AUTH_ROUTING.CHILDREN.LOGIN,
    loadComponent: () => import("./login-sign-in/login-sign-in.component").then((c) => c.LoginSignInComponent),
    title: pagesTitle.LOGIN,
    data: {},
  },
  {
    path: configRoutes.AUTH_ROUTING.CHILDREN.REGISTER,
    loadComponent: () => import("./register/register.component").then((c) => c.RegisterComponent),
    title: pagesTitle.REGISTER,
    data: {},
  },
  {
    path: "**",
    redirectTo: configRoutes.AUTH_ROUTING.CHILDREN.LOGIN,
  },
];
