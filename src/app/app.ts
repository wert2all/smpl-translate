import { Component, HostListener, inject, ViewChild } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { TranslateContainerComponent } from './features/translate-container/translate-container.component';
import { UserLanguagesComponent } from './features/user-languages/user-languages.component';
import { ActionsService } from './shared/services/actions.service';
import { LanguageService } from './shared/services/language.service';
import { MappingService } from './shared/services/mapping.service';
import { ModeService } from './shared/services/mode.service';
import { Action, LanguageCode, Mode } from './shared/shared.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [TranslateContainerComponent, UserLanguagesComponent],
})
export class App {
  @ViewChild('settingUserLanguagesDialog')
  settingUserLanguages!: UserLanguagesComponent;

  private modeService = inject(ModeService);
  private mappingService = inject(MappingService);
  private languageService = inject(LanguageService);
  private actionsService = inject(ActionsService);

  constructor() {
    this.actionsService.actions
      .pipe(
        takeUntilDestroyed(),
        filter(action => action == Action.UpdateUserLanguages)
      )
      .subscribe(() => {
        this.showUserLanguages();
      });
  }

  @HostListener('document:keydown.escape')
  handleKeyboardEvent() {
    this.modeService.update(Mode.normal);
  }

  @HostListener('document:keydown.control.s', ['$event'])
  translate(e: Event) {
    e.preventDefault();
    console.log('translate');
  }

  @HostListener('document:keydown', ['$event.key'])
  onSpacePress(key: string) {
    this.mappingService.pressKey(key);
  }

  protected saveUserLanguages(languages: LanguageCode[]) {
    this.languageService.setUserLanguages(languages);
  }

  private showUserLanguages() {
    this.settingUserLanguages.open();
  }
}
