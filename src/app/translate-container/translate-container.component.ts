import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { provideIcons } from '@ng-icons/core';
import { flagGbSquare, flagUaSquare } from '@ng-icons/flag-icons/square';
import { filter } from 'rxjs';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { SpacerComponent } from '../shared/components/spacer/spacer.component';
import { DialogsService } from '../shared/services/dialogs.service';
import { LanguageService } from '../shared/services/language.service';
import { ModeService } from '../shared/services/mode.service';
import {
  createInitialState,
  DialogType,
  LanguageCode,
  Mode,
  State,
} from '../shared/shared.types';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { UserLanguagesComponent } from './dialogs/user-languages/user-languages.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { TranslationComponent } from './translation/translation.component';

@Component({
  selector: 'app-translate-container',
  templateUrl: './translate-container.component.html',
  styleUrls: ['./translate-container.component.scss'],
  imports: [
    LanguageSwitcherComponent,
    BottomBarComponent,
    TranslationComponent,
    SpacerComponent,
    InputContainerComponent,
    AlertComponent,
    LoaderComponent,
    UserLanguagesComponent,
  ],
  viewProviders: [provideIcons({ flagUaSquare, flagGbSquare })],
})
export class TranslateContainerComponent {
  @ViewChild('settingUserLanguagesDialog')
  settingUserLanguages!: UserLanguagesComponent;

  private modeService = inject(ModeService);
  private dialogService = inject(DialogsService);
  private languageService = inject(LanguageService);

  protected inputString = signal('');
  protected height = signal<number | null>(null);
  protected mode = toSignal(this.modeService.mode, {
    initialValue: Mode.insert,
  });

  protected translateState = computed((): State => createInitialState());
  protected fromLanguage = computed(() => LanguageCode.en);
  protected toLanguage = computed(() => LanguageCode.ua);

  protected loading = computed(() => this.translateState().type == 'loading');

  protected error = computed((): string | null => {
    const state = this.translateState();
    return state.type == 'failure' && typeof state.error.message === 'string'
      ? state.error.message
      : null;
  });

  protected translated = computed((): string | null => {
    const state = this.translateState();
    return state.type == 'success' && typeof state.data === 'string'
      ? state.data
      : null;
  });

  constructor() {
    this.dialogService.openWindow
      .pipe(
        takeUntilDestroyed(),
        filter(type => type == DialogType.userLanguages)
      )
      .subscribe(() => {
        this.showUserLanguages();
      });
  }
  onFocus() {
    this.modeService.update(Mode.insert);
  }

  unFocus() {
    this.modeService.update(Mode.normal);
  }

  fired() {
    console.log('fired');
  }

  showUserLanguages() {
    this.settingUserLanguages.open();
  }

  saveUserLanguages(languages: LanguageCode[]) {
    this.languageService.setUserLanguages(languages);
  }
}
