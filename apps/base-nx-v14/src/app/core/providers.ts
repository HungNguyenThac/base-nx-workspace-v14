import { HTTP_INTERCEPTORS, HttpHandler } from "@angular/common/http";
import * as fromInterceptors from "@core/interceptors";
import { DEFAULT_TIMEOUT } from "@core/interceptors/timeout.interceptor";
import { APP_INITIALIZER, Injector } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { CustomMatPaginatorIntl } from "./common/providers/mat-paginator-custom";
import { config } from "@core/common/constants/config";
import { appInitializerFactory, MultiLanguageService } from "@app/share/translate";
import { CustomPreloadingStrategy } from "@core/common/providers/custom-preloading-strategy";
import { TitleStrategy } from "@angular/router";
import { TemplatePageTitleStrategy } from "@core/services/set-browser-title.service";

export const providers = [
  MultiLanguageService,
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFactory,
    deps: [MultiLanguageService, Injector],
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: fromInterceptors.ApiHttpInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: fromInterceptors.HandleErrorsInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: fromInterceptors.TimingInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: fromInterceptors.LoadingInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: fromInterceptors.TimeoutInterceptor,
    multi: true,
  },
  { provide: DEFAULT_TIMEOUT, useValue: config.DEFAULT_TIMEOUT },
  { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
  CustomPreloadingStrategy,
];
