import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this._loading.asObservable();
  private processes = 0;
  constructor() {}

  next(value: boolean) {
    value ? this.processes++ : this.processes--;
    const nextState = this.processes > 0;
    this._loading.next(nextState);
  }
}
