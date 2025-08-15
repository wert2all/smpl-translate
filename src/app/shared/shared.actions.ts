import { inject, Injector, runInInjectionContext } from '@angular/core';

import { DialogsService } from './services/dialogs.service';
import { Action, DialogType } from './shared.types';

export const SwitchLanguage: Action = () => {
  console.log('switch language');
};

export const ChangeFromLanguage =
  (injector: Injector): Action =>
  () => {
    runInInjectionContext(injector, () => {
      inject(DialogsService).openWindow.next(DialogType.selectFromLanguage);
    });
  };

export const ChangeToLanguage =
  (injector: Injector): Action =>
  () => {
    runInInjectionContext(injector, () =>
      inject(DialogsService).openWindow.next(DialogType.selectToLanguage)
    );
  };

export const Translate: Action = () => {
  console.log('translate');
};

export const UserLanguagesFactory =
  (injector: Injector): Action =>
  () => {
    runInInjectionContext(injector, () => {
      inject(DialogsService).openWindow.next(DialogType.userLanguages);
    });
  };
