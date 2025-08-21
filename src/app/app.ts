import { Component, inject, ViewChild } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { BottomBarComponent } from './features/bottom-bar/bottom-bar.component';
import { LanguageSwitcherComponent } from './features/language-switcher/language-switcher.component';
import { TranslateContainerComponent } from './features/translate-container/translate-container.component';
import { UserLanguagesComponent } from './features/user-languages/user-languages.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ActionsService } from './shared/services/actions.service';
import { Action } from './shared/shared.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    TranslateContainerComponent,
    UserLanguagesComponent,
    BottomBarComponent,
    LanguageSwitcherComponent,
    LayoutComponent,
  ],
})
export class App {
  @ViewChild('settingUserLanguagesDialog')
  settingUserLanguages!: UserLanguagesComponent;

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

  private showUserLanguages() {
    this.settingUserLanguages.open();
  }
}
