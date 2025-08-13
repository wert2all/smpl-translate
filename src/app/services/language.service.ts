import { inject, Injectable } from '@angular/core';
import { flagGbSquare, flagUaSquare } from '@ng-icons/flag-icons/square';
import { BehaviorSubject } from 'rxjs';
import { Language, LanguageCode } from '../shared/shared.types';
import { LocalStorageService } from './local-storage.service';

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
      this.localStorageService.getItem<LanguageCode[]>('userLanguages') || []
    )
      .map(code => this.all.find(language => language.code === code))
      .filter(lang => !!lang);
  }
}
