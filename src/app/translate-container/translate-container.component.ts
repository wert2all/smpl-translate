import { Component, computed, signal } from '@angular/core';
import { dumpInput } from '../shared/dump.types';
import { Language } from '../shared/shared.types';
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
  ],
})
export class TranslateContainerComponent {
  protected inputString = signal(dumpInput);
  protected translatedString = computed(() => this.inputString());
  protected height = signal<number | null>(null);

  protected fromLanguage = computed(() => Language.en);
  protected toLanguage = computed(() => Language.ua);

  changeHeight(height: number) {
    this.height.set(height);
  }
}
