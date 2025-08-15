import { inject, Injectable } from '@angular/core';
import { flagGbSquare, flagUaSquare } from '@ng-icons/flag-icons/square';
import { BehaviorSubject, map } from 'rxjs';
import { Language, LanguageCode } from '../../shared/shared.types';
import { LocalStorageService } from './local-storage.service';

const USER_LANGUAGES_KEY = 'userLanguages';
const USER_FROM_LANGUAGE_KEY = 'userFromLanguage';
const USER_TO_LANGUAGE_KEY = 'userToLanguage';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private localStorageService = inject(LocalStorageService);

  readonly all: Language[] = [
    {
      code: LanguageCode.en,
      name: 'english',
      flag: flagGbSquare,
    },
    {
      code: LanguageCode.ua,
      name: 'ukrainian',
      flag: flagUaSquare,
    },
  ];

  readonly userLanguages = new BehaviorSubject<Language[]>(
    this.readUserLanguages()
  );

  private readUserLanguages(): Language[] {
    return (
      this.localStorageService.getItem<LanguageCode[]>(USER_LANGUAGES_KEY) || []
    )
      .map(code => this.all.find(language => language.code === code))
      .filter(lang => !!lang);
  }

  private getUserLanguage(languageCode: LanguageCode | undefined | null) {
    return this.userLanguages.pipe(
      map(languages =>
        languages.find(language => language.code === languageCode)
      )
    );
  }

  setUserLanguages(languages: LanguageCode[]) {
    this.localStorageService.setItem(USER_LANGUAGES_KEY, languages);
    this.userLanguages.next(this.readUserLanguages());
  }

  getUserFromLanguage() {
    return this.getUserLanguage(
      this.localStorageService.getItem<LanguageCode>(USER_FROM_LANGUAGE_KEY)
    );
  }

  getUserToLanguage() {
    return this.getUserLanguage(
      this.localStorageService.getItem<LanguageCode>(USER_TO_LANGUAGE_KEY)
    );
  }
}
