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
  }

  protected save() {
    this.close();
  }

  protected close() {
    this.dialogElement.nativeElement.close();
  }
}
