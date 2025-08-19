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
import { ActionsService } from '../../shared/services/actions.service';
import { LanguageService } from '../../shared/services/language.service';
import {
  Action,
  Language,
  LanguageCode,
  SelectOption,
} from '../../shared/shared.types';
import { PanelComponent } from './panel/panel.component';
import { SelectorComponent } from './selector/selector.component';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  imports: [SelectorComponent, PanelComponent],
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
  private actionService = inject(ActionsService);

  private userLanguages = signal<Language[]>([]);

  private optionLanguages = computed((): Language[] => [
    ...this.userLanguages(),
    ...(this.isAllLanguages() ? this.languageService.all : []),
  ]);

  protected switchAction = Action.SwitchLanguage;
  protected changeFromAction = Action.ChangeFromLanguage;
  protected changeToAction = Action.ChangeToLanguage;

  protected isAllLanguages = signal(false);

  private maybeFromLanguage = signal<Language | null | undefined>(null);
  private maybeToLanguage = signal<Language | null | undefined>(null);

  protected canChangeLanguages = signal(false);

  protected fromOptions = computed((): SelectOption[] =>
    this.createOptions(this.maybeFromLanguage(), this.optionLanguages())
  );

  protected toOptions = computed((): SelectOption[] =>
    this.createOptions(this.maybeToLanguage(), this.optionLanguages())
  );

  protected panelFromView = computed(() => {
    const title = this.maybeFromLanguage()?.name || 'will detect language';
    const icon = this.maybeFromLanguage()?.flag || phosphorAlienLight;
    return { title, icon };
  });
  protected panelToView = computed(() => {
    const title = this.maybeToLanguage()?.name || 'no target language';
    const icon = this.maybeToLanguage()?.flag;
    return { title, icon };
  });

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
        if (languages.length == 0) {
          this.isAllLanguages.set(true);
        }
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

    this.actionService.actions
      .pipe(
        takeUntilDestroyed(),
        filter(
          action =>
            action == Action.ChangeFromLanguage ||
            action == Action.ChangeToLanguage
        )
      )
      .subscribe(action => {
        this.selector.setFocus(
          action == Action.ChangeFromLanguage ? 'from' : 'to'
        );
        this.canChangeLanguages.set(true);
      });

    this.actionService.actions
      .pipe(
        takeUntilDestroyed(),
        filter(action => action == Action.SwitchLanguage)
      )
      .subscribe(() => {
        const from = this.maybeFromLanguage()?.code || null;
        const to = this.maybeToLanguage()?.code || null;

        this.languageService.setUserFromLanguageCode(to);
        this.languageService.setUserToLanguageCode(from);
      });
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

  fireAction(action: Action) {
    this.actionService.fireAction(action);
  }

  @HostListener('window:keydown.escape')
  protected onEscapeKey() {
    if (this.canChangeLanguages()) {
      this.closeSelector();
    }
  }
}
