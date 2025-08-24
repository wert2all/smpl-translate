import { Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { provideIcons } from '@ng-icons/core';
import { flagGbSquare, flagUaSquare } from '@ng-icons/flag-icons/square';
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

import { Clipboard } from '@angular/cdk/clipboard';
import { filter } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EnvironmentType } from '../../../environments/environment.types';
import { dumpInput } from '../../shared/dump.types';
import { ActionsService } from '../../shared/services/actions.service';
import { LanguageService } from '../../shared/services/language.service';
import { NotificationService } from '../../shared/services/notification.service';
import { TranslateService } from '../../shared/services/translate.service';
import { InputContainerComponent } from './input-container/input-container.component';
import { TranslationComponent } from './translation/translation.component';

@Component({
  selector: 'app-translate-container',
  templateUrl: './translate-container.component.html',
  styleUrls: ['./translate-container.component.scss'],
  imports: [
    TranslationComponent,
    SpacerComponent,
    InputContainerComponent,
    LoaderComponent,
  ],
  viewProviders: [provideIcons({ flagUaSquare, flagGbSquare })],
})
export class TranslateContainerComponent {
  private modeService = inject(ModeService);
  private actionsService = inject(ActionsService);
  private translationService = inject(TranslateService);
  private languagesService = inject(LanguageService);
  private notificationService = inject(NotificationService);
  private clipboard = inject(Clipboard);

  protected inputText = signal<string>(
    environment.type == EnvironmentType.development ? dumpInput : ''
  );
  protected height = signal<number | null>(null);

  private fromLanguage = signal<Language | undefined>(undefined);
  private toLanguage = signal<Language | undefined>(undefined);

  protected setInputMode = signal(true);

  protected translateState = toSignal(this.translationService.state, {
    initialValue: createInitialState() as State<TranslationResult>,
  });

  protected loading = computed(() => this.translateState().type == 'loading');

  private error = computed((): string | null => {
    const state = this.translateState();
    return state.type == 'failure' ? state.error.message : null;
  });

  protected translated = computed((): string | null => {
    const state = this.translateState();
    return state.type == 'success' && typeof state.data.text === 'string'
      ? state.data.text
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
          this.inputText(),
          this.fromLanguage(),
          this.toLanguage()
        );
      });
    this.actionsService.actions
      .pipe(filter(action => action == Action.YankTranslation))
      .subscribe(() => {
        const translated = this.translated();
        if (translated) {
          this.clipboard.copy(translated);
          this.notificationService.sendSuccess('Translation copied.');
        }
      });
    effect(() => {
      const error = this.error();
      if (error) {
        this.notificationService.sendError(error);
      }
    });
  }

  protected switchToInputMode() {
    this.modeService.update(Mode.insert);
  }

  protected translate() {
    this.actionsService.fireAction(Action.Translate);
  }

  protected changeInputValue(value: string) {
    this.inputText.set(value);
  }
}
