import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of, timer } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { config } from "@core/common/constants/config";

// Reference: https://viblo.asia/p/angular-cai-thien-hieu-nang-va-trai-nghiem-nguoi-dung-voi-lazy-loading-djeZ1BkRlWz
// Reference: https://www.concretepage.com/angular-2/angular-custom-preloading-strategy

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preloadedModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data["preload"]) {
      if (route.path) {
        this.preloadedModules.push(route.path);
      }

      if (route.data["delay"]) {
        return timer(config.DELAY_PRELOAD_STRATEGY).pipe(mergeMap(() => load()));
      }

      return load();
    } else {
      return of(null);
    }
  }
}
