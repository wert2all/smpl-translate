import {
  Component,
  computed,
  HostListener,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
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

  private optionLanguages = computed((): Language[] => [
    ...this.userLanguages(),
    ...(this.isAllLanguages() ? this.languageService.all : []),
  ]);

  protected phosphorArrowsLeftRightLight = phosphorArrowsLeftRightLight;
  protected phosphorAlienLight = phosphorAlienLight;

  protected isAllLanguages = signal(false);

  protected maybeFromLanguage = signal<Language | null | undefined>(null);
  protected maybeToLanguage = signal<Language | null | undefined>(null);

  protected isDefinedLanguage = computed(
    () => this.maybeFromLanguage() && this.maybeToLanguage()
  );

  protected canChangeLanguages = signal(true);

  protected fromOptions = computed((): SelectOption[] =>
    this.createOptions(this.maybeFromLanguage(), this.optionLanguages())
  );

  protected toOptions = computed((): SelectOption[] =>
    this.createOptions(this.maybeToLanguage(), this.optionLanguages())
  );

  private createOptions(
    userSelected: Language | null | undefined,
    languages: Language[]
  ): SelectOption[] {
    return [userSelected, ...languages]
      .map(language =>
        language
          ? {
              title: language.name,
              value: language.code,
              icon: language.flag,
              isSelected: language.code == userSelected?.code,
            }
          : null
      )
      .filter(
        (item, index, arr) =>
          item && arr.findIndex(i => i?.value === item.value) === index
      ) as SelectOption[];
  }

  private getLanguageCode(value: string | null): LanguageCode | null {
    return Object.values(LanguageCode).includes(value as LanguageCode)
      ? (value as LanguageCode)
      : null;
  }

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
        filter(
          type =>
            type == DialogType.selectFromLanguage ||
            type == DialogType.selectToLanguage
        )
      )
      .subscribe(type => {
        this.selector.setFocus(
          type == DialogType.selectFromLanguage ? 'from' : 'to'
        );
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

  closeSelector() {
    this.canChangeLanguages.set(false);
  }

  @HostListener('window:keydown.escape')
  protected onEscapeKey() {
    if (this.canChangeLanguages()) {
      this.closeSelector();
    }
  }
}
