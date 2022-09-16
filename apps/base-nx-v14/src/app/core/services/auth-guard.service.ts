import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanLoad,
  Route,
  Router,
  UrlSegment,
} from "@angular/router";
import { AuthService } from "./auth.service";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(
    public auth: AuthService,
    public router: Router,
    private _location: Location
  ) {}
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(["auth/sign-in"]).then();
      return false;
    }
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    this._location.back();
    return false;
  }
}
