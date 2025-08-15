import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { provideIcons } from '@ng-icons/core';
import { flagGbSquare, flagUaSquare } from '@ng-icons/flag-icons/square';
import {
  phosphorAlienLight,
  phosphorArrowsLeftRightLight,
} from '@ng-icons/phosphor-icons/light';
import { IconButtonComponent } from '../../shared/components/buttons/icon-button/icon-button.component';
import { LanguageService } from '../../shared/services/language.service';
import { Language, SelectOption } from '../../shared/shared.types';
import { SelectorComponent } from './selector/selector.component';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  imports: [IconButtonComponent, SelectorComponent],
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

  private userLanguages = signal<Language[]>([]);

  protected isAllLanguages = signal(false);

  protected maybeFromLanguage = toSignal(
    this.languageService.getUserFromLanguage()
  );
  protected maybeToLanguage = toSignal(
    this.languageService.getUserToLanguage()
  );

  protected isDefinedLanguage = computed(
    () => this.maybeFromLanguage() && this.maybeToLanguage()
  );

  private options = computed((): SelectOption[] =>
    this.makeUniqueLanguages([
      ...this.userLanguages(),
      ...(this.isAllLanguages() ? this.languageService.all : []),
    ]).map(language => ({
      title: language.name,
      value: language.code,
      icon: language.flag,
      isSelected: false,
    }))
  );

  private makeUniqueLanguages(languages: Language[]) {
    return Array.from(
      new Map(languages.map(lang => [lang.code, lang])).values()
    );
  }

  protected fromOptions = computed((): SelectOption[] => {
    const options = this.options();
    const from = this.maybeFromLanguage();
    return options.map(option =>
      option.value == from?.code ? { ...option, selected: true } : option
    );
  });
  protected toOptions = computed((): SelectOption[] => {
    const options = this.options();
    const to = this.maybeToLanguage();
    return options.map(option =>
      option.value == to?.code ? { ...option, selected: true } : option
    );
  });

  constructor() {
    this.languageService.userLanguages
      .pipe(takeUntilDestroyed())
      .subscribe(languages => {
        this.userLanguages.set(languages);
      });
  }

  switchLanguage() {
    throw new Error('Method not implemented.');
  }

  addOtherLanguages() {
    this.isAllLanguages.set(true);
  }
}
