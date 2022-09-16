import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { LangChangeEvent } from "@ngx-translate/core/lib/translate.service";
import { environment } from "@environments/environment";

@Injectable({ providedIn: "root" })
export class MultiLanguageService {
  private defaultLang = environment.DEFAULT_LANGUAGE;
  private _langSubject = new BehaviorSubject<string>(this.defaultLang);
  public lang$ = this._langSubject.asObservable();
  private _translationsUrl = "assets/i18n";
  private _languageList: string[] = ["vi", "en"];

  constructor(
    public translateService: TranslateService,
    private http: HttpClient
  ) {}

  public currentLanguage() {
    const _language = localStorage.getItem("_language");
    if (!_language || !this._languageList.includes(_language)) {
      this._setCurrentLanguage(this.defaultLang);
      return this.defaultLang;
    }
    return _language;
  }

  private _setCurrentLanguage(language: string) {
    localStorage.setItem("_language", language);
    this._langSubject.next(language);
  }

  public changeLanguage(language: string) {
    this._setCurrentLanguage(language);
  }

  public use(language: string) {
    this.changeLanguage(language);
    return this.translateService.use(language);
  }

  public setDefaultLang(language: string) {
    return this.translateService.setDefaultLang(language);
  }

  public reloadLang(language: string) {
    return this.translateService.reloadLang(language);
  }

  public resetLang(language: string) {
    return this.translateService.resetLang(language);
  }

  public onSetupMultiLanguage(prefixName: string) {
    this.lang$.subscribe((value) => {
      const language = value;
      this.translateService.use(language).subscribe((value) => {
        this.loadTranslations(language, prefixName);
      });
    });

    this.translateService.use(this.currentLanguage()).subscribe((value) => {
      this.loadTranslations(this.currentLanguage(), prefixName);
    });
  }

  private loadTranslations(locale: string, prefixName: string) {
    let cacheBuster = new Date().toISOString().replace(/\\.|:|-/g, "");
    return this.http
      .get(
        `${this._translationsUrl}/${prefixName}/${locale}.json?cacheBuster=${cacheBuster}`
      )
      .subscribe((data: any) => {
        this.translateService.setTranslation(locale, data, true);
      });
  }

  public get(
    key: string | Array<string>,
    interpolateParams?: Object
  ): Observable<string | any> {
    return this.translateService.get(key, interpolateParams);
  }

  public instant(key: string | Array<string>, interpolateParams?: Object) {
    return this.translateService.instant(key, interpolateParams);
  }

  get onLangChange(): EventEmitter<LangChangeEvent> {
    return new this.translateService.onLangChange();
  }
}
