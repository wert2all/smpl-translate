import { inject, Injectable, Injector } from '@angular/core';
import {
  ChangeFromLanguage,
  ChangeToLanguage,
  SwitchLanguage,
  UserLanguagesFactory,
} from '../../shared/shared.actions';
import { Mapping, Mode } from '../../shared/shared.types';

@Injectable({
  providedIn: 'root',
})
export class MappingFactory {
  private injector = inject(Injector);
  createMapping(): Record<Mode, Mapping[]> {
    return {
      [Mode.insert]: this.createInsertMenu(),
      [Mode.normal]: this.createNormalMenu(),
      [Mode.visual]: [],
    };
  }

  private createInsertMenu(): Mapping[] {
    return [
      { keys: ['esc'], description: 'normal mode' },
      { keys: ['ctrl', 's'], description: 'translate' },
    ];
  }

  private createNormalMenu(): Mapping[] {
    return [
      { keys: ['space'], description: 'menu', mapping: this.createSpaceMenu() },
    ];
  }

  private createSpaceMenu(): Mapping[] {
    return [
      {
        keys: ['l'],
        description: 'language',
        mapping: this.createLanguageManu(),
      },
      {
        keys: ['s'],
        description: 'settings',
        mapping: this.createSettingsManu(),
      },
    ];
  }

  private createLanguageManu(): Mapping[] {
    return [
      { keys: ['s'], description: 'switch language', action: SwitchLanguage },
      {
        keys: ['f'],
        description: 'change from language',
        action: ChangeFromLanguage,
      },
      {
        keys: ['t'],
        description: 'change to language',
        action: ChangeToLanguage,
      },
    ];
  }

  private createSettingsManu(): Mapping[] {
    return [
      {
        keys: ['l'],
        description: 'our languages',
        action: UserLanguagesFactory(this.injector),
      },
    ];
  }
}
