import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { provideIcons } from '@ng-icons/core';
import { flagGbSquare, flagUaSquare } from '@ng-icons/flag-icons/square';
import {
  phosphorAlienLight,
  phosphorArrowsLeftRightLight,
} from '@ng-icons/phosphor-icons/light';
import { filter } from 'rxjs';
import { IconButtonComponent } from '../../shared/components/buttons/icon-button/icon-button.component';
import { DialogsService } from '../../shared/services/dialogs.service';
import { LanguageService } from '../../shared/services/language.service';
import {
  DialogType,
  Language,
  LanguageCode,
  SelectOption,
} from '../../shared/shared.types';
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
  @ViewChild('selector') selector!: SelectorComponent;

  private languageService = inject(LanguageService);
  private dialogService = inject(DialogsService);

  private userLanguages = signal<Language[]>([]);

  protected phosphorArrowsLeftRightLight = phosphorArrowsLeftRightLight;
  protected phosphorAlienLight = phosphorAlienLight;

  protected isAllLanguages = signal(false);

  protected maybeFromLanguage = signal<Language | null | undefined>(null);
  protected maybeToLanguage = signal<Language | null | undefined>(null);

  protected isDefinedLanguage = computed(
    () => this.maybeFromLanguage() && this.maybeToLanguage()
  );

  private options = computed((): SelectOption[] =>
    this.makeUniqueLanguages(this.getListLanguages()).map(language => ({
      title: language.name,
      value: language.code,
      icon: language.flag,
      isSelected: false,
    }))
  );
  protected canChangeLanguages = signal(false);

  private getListLanguages(): Language[] {
    return [
      this.maybeFromLanguage(),
      this.maybeToLanguage(),
      ...this.userLanguages(),
      ...(this.isAllLanguages() ? this.languageService.all : []),
    ].filter(l => !!l);
  }

  private makeUniqueLanguages(languages: Language[]) {
    return Array.from(
      new Map(languages.map(lang => [lang.code, lang])).values()
    );
  }

  protected fromOptions = computed((): SelectOption[] => {
    const options = this.options();
    const from = this.maybeFromLanguage();
    return options.map(option =>
      option.value == from?.code ? { ...option, isSelected: true } : option
    );
  });

  protected toOptions = computed((): SelectOption[] => {
    const options = this.options();
    const to = this.maybeToLanguage();
    return options.map(option =>
      option.value == to?.code ? { ...option, isSelected: true } : option
    );
  });

  constructor() {
    this.languageService.userLanguages
      .pipe(takeUntilDestroyed())
      .subscribe(languages => {
        this.userLanguages.set(languages);
      });

    this.languageService.userFromLanguage
      .pipe(takeUntilDestroyed())
      .subscribe(language => {
        this.maybeFromLanguage.set(language);
      });

    this.languageService.userToLanguage
      .pipe(takeUntilDestroyed())
      .subscribe(language => {
        this.maybeToLanguage.set(language);
      });

    this.dialogService.openWindow
      .pipe(
        takeUntilDestroyed(),
        filter(type => type == DialogType.selectFromLanguage)
      )
      .subscribe(() => {
        this.selector.setFocus('from');
        this.canChangeLanguages.set(true);
      });

    this.dialogService.openWindow
      .pipe(
        takeUntilDestroyed(),
        filter(type => type == DialogType.selectToLanguage)
      )
      .subscribe(() => {
        this.selector.setFocus('to');
        this.canChangeLanguages.set(true);
      });
  }

  switchLanguage() {
    throw new Error('Method not implemented.');
  }

  addOtherLanguages() {
    this.isAllLanguages.set(true);
  }

  selectFromLanguage(option: SelectOption) {
    const languageCode = this.getLanguageCode(
      option.isSelected ? null : option.value
    );
    this.languageService.setUserFromLanguageCode(languageCode);
  }

  selectToLanguage(option: SelectOption) {
    const languageCode = this.getLanguageCode(
      option.isSelected ? null : option.value
    );
    this.languageService.setUserToLanguageCode(languageCode);
  }

  getLanguageCode(value: string | null): LanguageCode | null {
    if (Object.values(LanguageCode).includes(value as LanguageCode)) {
      return value as LanguageCode;
    }
    return null;
  }

  closeSelector() {
    this.canChangeLanguages.set(false);
  }
}
