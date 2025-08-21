import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../shared/components/buttons/button/button.component';
import { ControlsComponent } from '../../shared/components/dialog/controls/controls.component';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { SelectComponent } from '../../shared/components/select/select.component';
import { LanguageService } from '../../shared/services/language.service';
import { Language, SelectOption } from '../../shared/shared.types';

@Component({
  selector: 'app-user-languages',
  templateUrl: './user-languages.component.html',
  imports: [
    DialogComponent,
    ControlsComponent,
    ButtonComponent,
    SelectComponent,
  ],
})
export class UserLanguagesComponent {
  @ViewChild('userLanguagesDialog')
  private dialogElement!: ElementRef<HTMLDialogElement>;
  @ViewChild('selector')
  private selector!: SelectComponent;

  private languageService = inject(LanguageService);

  private userLanguages = signal<Language[]>([]);
  protected options = computed((): SelectOption[] => {
    const userLanguages = this.userLanguages();
    return this.languageService.all.map(language => {
      return {
        value: language.code,
        title: language.name,
        isSelected: userLanguages.find(l => l.code == language.code) != null,
        icon: language.flag,
      };
    });
  });

  constructor() {
    this.languageService.userLanguages
      .pipe(takeUntilDestroyed())
      .subscribe(languages => {
        this.userLanguages.set(languages);
      });
  }

  open() {
    this.dialogElement.nativeElement.showModal();
    this.selector.setFocus();
  }

  protected save() {
    this.close();
  }

  protected close() {
    this.dialogElement.nativeElement.close();
  }

  protected toggleOption(option: SelectOption): void {
    const selectedLanguage = this.languageService.all.find(
      language => language.code === option.value
    );

    if (selectedLanguage) {
      option.isSelected = !option.isSelected;

      const currentUserLanguages = this.userLanguages();
      const updatedLanguages = option.isSelected
        ? [...currentUserLanguages, selectedLanguage]
        : currentUserLanguages.filter(
            language => language.code !== selectedLanguage.code
          );

      const languageCodes = updatedLanguages.map(language => language.code);
      this.languageService.setUserLanguages(languageCodes);
    }
  }
}
