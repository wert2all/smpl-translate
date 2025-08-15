import { Component, computed, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { flagGbSquare, flagUaSquare } from '@ng-icons/flag-icons/square';
import {
  phosphorAlienLight,
  phosphorArrowsLeftRightLight,
} from '@ng-icons/phosphor-icons/light';
import { IconButtonComponent } from '../../shared/components/buttons/icon-button/icon-button.component';
import { LanguageCode } from '../../shared/shared.types';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  imports: [IconButtonComponent],
  viewProviders: [
    provideIcons({
      phosphorArrowsLeftRightLight,
      flagUaSquare,
      flagGbSquare,
      phosphorAlienLight,
    }),
  ],
})
export class LanguageSwitcherComponent {
  maybeFromLanguage = signal<LanguageCode>(LanguageCode.en);
  maybeToLanguage = signal<LanguageCode>(LanguageCode.ua);

  protected isDefinedLanguage = computed(
    () => this.maybeFromLanguage() && this.maybeToLanguage()
  );
}
