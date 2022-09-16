import { enableProdMode, importProvidersFrom } from "@angular/core";
import { environment } from "@environments/environment";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "@app/app.component";
import { provideRouter, withPreloading, withRouterConfig } from "@angular/router";
import { routes } from "@app/app-routing.module";
import { CustomPreloadingStrategy } from "@core/common/providers/custom-preloading-strategy";
import { CoreModule } from "@core/core.module";
import { ShareModule } from "@app/share/share.module";

if (environment.PRODUCTION) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withPreloading(CustomPreloadingStrategy),
      withRouterConfig({
        paramsInheritanceStrategy: "always",
      })
    ),
    importProvidersFrom(CoreModule),
    importProvidersFrom(ShareModule),
  ],
})
  .then()
  .catch((err) => alert(err));
