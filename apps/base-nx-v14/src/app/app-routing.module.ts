import { Routes } from "@angular/router";
import { MainLayoutComponent } from "@app/layout/main-layout/main-layout.component";
import { configRoutes } from "@core/common/constants/routes-config";
import { NotFoundComponent } from "@app/pages/Errors/not-found/not-found.component";
import { pagesTitle } from "@core/common/constants/pages-title";

export const routes: Routes = [
  {
    path: configRoutes.APP_ROUTING.PATH,
    component: MainLayoutComponent,
    title: "Main layout",
  },
  {
    path: configRoutes.APP_ROUTING.AUTH_ROUTING,
    loadChildren: () => import("./pages/auth/auth-routing.module").then((mod) => mod.authRoutes),
    // canLoad: [AuthGuardService],
    data: { preload: true, delay: true },
  },
  {
    path: configRoutes.APP_ROUTING.NOT_FOUND,
    component: NotFoundComponent,
    title: pagesTitle.NOT_FOUND,
  },
];
