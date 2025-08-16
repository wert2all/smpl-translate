import { inject, Injectable } from '@angular/core';
import {
  flagGbSquare,
  flagItSquare,
  flagUaSquare,
} from '@ng-icons/flag-icons/square';
import { BehaviorSubject } from 'rxjs';
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
    {
      code: LanguageCode.it,
      name: 'italian',
      flag: flagItSquare,
    },
  ];

  readonly userLanguages = new BehaviorSubject<Language[]>(
    this.readUserLanguages()
  );
  readonly userFromLanguage = new BehaviorSubject<Language | undefined>(
    this.getLanguage(
      this.localStorageService.getItem<LanguageCode>(USER_FROM_LANGUAGE_KEY)
    )
  );
  readonly userToLanguage = new BehaviorSubject<Language | undefined>(
    this.getLanguage(
      this.localStorageService.getItem<LanguageCode>(USER_TO_LANGUAGE_KEY)
    )
  );

  private readUserLanguages(): Language[] {
    return (
      this.localStorageService.getItem<LanguageCode[]>(USER_LANGUAGES_KEY) || []
    )
      .map(code => this.all.find(language => language.code === code))
      .filter(lang => !!lang);
  }

  private getLanguage(languageCode: LanguageCode | undefined | null) {
    return this.all.find(language => language.code === languageCode);
  }

  setUserLanguages(languages: LanguageCode[]) {
    this.localStorageService.setItem(USER_LANGUAGES_KEY, languages);
    this.userLanguages.next(this.readUserLanguages());
  }

  setUserToLanguageCode(code: LanguageCode | null) {
    this.localStorageService.setItem(USER_TO_LANGUAGE_KEY, code);
    this.userToLanguage.next(this.getLanguage(code));
  }

  setUserFromLanguageCode(code: LanguageCode | null) {
    this.localStorageService.setItem(USER_FROM_LANGUAGE_KEY, code);
    this.userFromLanguage.next(this.getLanguage(code));
  }
}
