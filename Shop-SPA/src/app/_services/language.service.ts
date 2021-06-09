import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public languages: string[] = ['en', 'es', 'de', 'it', 'ru'];

  constructor(public translate: TranslateService) {
    let browserLang = 'en';
    this.translate.addLangs(this.languages);
    // if (this.cookieService.check('lang')) {
    //   browserLang = this.cookieService.get('lang');
    // } else {
    //   browserLang = translate.getBrowserLang();
    // }
    translate.use(browserLang.match(/en|es|de|it|ru/) ? browserLang : 'en');
  }

  public setLanguage(lang) {
    this.translate.use(lang);
    // this.cookieService.set('lang', lang);
  }
}
