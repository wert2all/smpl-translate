import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { provideIcons } from '@ng-icons/core';
import { flagGbSquare, flagUaSquare } from '@ng-icons/flag-icons/square';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { SpacerComponent } from '../../shared/components/spacer/spacer.component';
import { ModeService } from '../../shared/services/mode.service';
import {
  Action,
  createInitialState,
  Language,
  Mode,
  State,
  TranslationResult,
} from '../../shared/shared.types';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';

import { filter } from 'rxjs';
import { dumpInput } from '../../shared/dump.types';
import { ActionsService } from '../../shared/services/actions.service';
import { LanguageService } from '../../shared/services/language.service';
import { TranslateService } from '../../shared/services/translate.service';
import { LanguageSwitcherComponent } from './../language-switcher/language-switcher.component';
import { InputContainerComponent } from './input-container/input-container.component';
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
  ],
  viewProviders: [provideIcons({ flagUaSquare, flagGbSquare })],
})
export class TranslateContainerComponent {
  private modeService = inject(ModeService);
  private actionsService = inject(ActionsService);
  private translationService = inject(TranslateService);
  private languagesService = inject(LanguageService);

  protected inputString = signal(dumpInput);
  protected height = signal<number | null>(null);

  private fromLanguage = signal<Language | undefined>(undefined);
  private toLanguage = signal<Language | undefined>(undefined);

  protected mode = toSignal(this.modeService.mode, {
    initialValue: Mode.insert,
  });
  protected setInputMode = signal(true);

  protected translateState = toSignal(this.translationService.state, {
    initialValue: createInitialState() as State<TranslationResult>,
  });

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
    this.modeService.mode.pipe(takeUntilDestroyed()).subscribe(mode => {
      this.setInputMode.set(mode == Mode.insert);
    });

    this.languagesService.userFromLanguage
      .pipe(takeUntilDestroyed())
      .subscribe(language => {
        this.fromLanguage.set(language);
      });
    this.languagesService.userToLanguage
      .pipe(takeUntilDestroyed())
      .subscribe(language => {
        this.toLanguage.set(language);
      });

    this.actionsService.actions
      .pipe(
        takeUntilDestroyed(),
        filter(action => action == Action.Translate)
      )
      .subscribe(() => {
        this.translationService.translate(
          this.inputString(),
          this.fromLanguage(),
          this.toLanguage()
        );
      });
  }

  protected switchToInputMode() {
    this.modeService.update(Mode.insert);
  }

  protected translate() {
    this.actionsService.fireAction(Action.Translate);
  }
}
