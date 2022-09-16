import { Injectable, NgZone } from "@angular/core";
import { BehaviorSubject, debounceTime, fromEvent, map } from "rxjs";
import { config } from "@core/common/constants/config";

@Injectable({
  providedIn: "root",
})
export class WindowResizeService {
  private _windowWidth = new BehaviorSubject<number>(window.innerWidth);
  public windowWidth$ = this._windowWidth.asObservable();

  constructor(private _ngZone: NgZone) {
    this._ngZone.runOutsideAngular(() =>
      fromEvent(window, "resize")
        .pipe(
          debounceTime(config.DEBOUNCE_TIME_WINDOW_RESIZE),
          map((event: Event) => (event.target as Window).innerWidth)
        )
        .subscribe((innerWidth) => {
          this._windowWidth.next(innerWidth);
        })
    );
  }
}
