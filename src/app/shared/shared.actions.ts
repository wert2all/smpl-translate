import { inject, Injector, runInInjectionContext } from '@angular/core';

import { DialogsService } from './services/dialogs.service';
import { Action, DialogType } from './shared.types';

export const SwitchLanguage: Action = () => {
  console.log('switch language');
};

export const ChangeFromLanguage: Action = () => {
  console.log('change from language');
};

export const ChangeToLanguage: Action = () => {
  console.log('change to language');
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
