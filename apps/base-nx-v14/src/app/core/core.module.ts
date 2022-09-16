import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { providers } from "@core/providers";
import { throwIfAlreadyLoaded } from "@core/module-import-guard";
import { HttpClient } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { JwtModule } from "@auth0/angular-jwt";
import { Storage } from "@core/utils/storage";
import { GlobalConfig, ToastrModule } from "ngx-toastr";
import { CoreStoreModule } from "@core/store";
import { NgxPermissionsModule } from "ngx-permissions";
import { HttpLoaderFactory } from "@app/share/translate";

const customNotifierOptions: Partial<GlobalConfig> = {
  positionClass: "toast-bottom-right",
  maxOpened: 3, // max toasts opened
  autoDismiss: true, // dismiss current toast when max is reached
};

export function tokenGetter() {
  const coreState = Storage.get("core");
  return coreState?.login?.authorization?.token;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreStoreModule,
    ToastrModule.forRoot(customNotifierOptions),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http:localhost:4200"],
      },
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxPermissionsModule.forRoot(),
  ],
  providers: [providers],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}
