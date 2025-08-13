import { Component, computed, signal } from '@angular/core';
import { AlertComponent } from '../shared/alert/alert.component';
import { dumpInput } from '../shared/dump.types';
import { createFailureState, Language, State } from '../shared/shared.types';
import { SpacerComponent } from '../shared/spacer/spacer.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
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
  ],
})
export class TranslateContainerComponent {
  protected inputString = signal(dumpInput);
  protected translateState = computed(
    (): State => createFailureState(new Error('something went wrong'))
  );
  protected height = signal<number | null>(null);

  protected fromLanguage = computed(() => Language.en);
  protected toLanguage = computed(() => Language.ua);

  protected translated = computed((): string | null => {
    const state = this.translateState();
    return state.type == 'success' && typeof state.data === 'string'
      ? state.data
      : null;
  });

  protected error = computed((): string | null => {
    const state = this.translateState();
    return state.type == 'failure' && typeof state.error.message === 'string'
      ? state.error.message
      : null;
  });
}
