import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { provideIcons } from '@ng-icons/core';
import { flagGbSquare, flagUaSquare } from '@ng-icons/flag-icons/square';
import {
  phosphorAlienLight,
  phosphorArrowsLeftRightLight,
} from '@ng-icons/phosphor-icons/light';
import { IconButtonComponent } from '../../shared/components/buttons/icon-button/icon-button.component';
import { LanguageService } from '../../shared/services/language.service';

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
  private languageService = inject(LanguageService);

  protected maybeFromLanguage = toSignal(
    this.languageService.getUserFromLanguage()
  );
  protected maybeToLanguage = toSignal(
    this.languageService.getUserToLanguage()
  );

  protected isDefinedLanguage = computed(
    () => this.maybeFromLanguage() && this.maybeToLanguage()
  );
}
