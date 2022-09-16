import { Injectable } from "@angular/core";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";
import { config } from "@core/common/constants/config";

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      document.title = [title, config.PROJECT_NAME].join(config.BROWSER_TAB_TITLE_DELIMITER);
    } else {
      document.title = config.PROJECT_NAME;
    }
  }
}
