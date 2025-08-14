import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../shared/buttons/button/button.component';
import { ControlsComponent } from '../../../shared/dialog/controls/controls.component';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { LanguageCode } from '../../../shared/shared.types';

@Component({
  selector: 'app-user-languages',
  templateUrl: './user-languages.component.html',
  imports: [DialogComponent, ControlsComponent, ButtonComponent],
})
export class UserLanguagesComponent {
  @ViewChild('settingUserLanguagesDialog')
  protected dialogElement!: ElementRef<HTMLDialogElement>;

  open() {
    this.dialogElement.nativeElement.showModal();
  }

  close() {
    this.dialogElement.nativeElement.close();
  }

  protected saveUserLanguages(codes: LanguageCode[]) {
    console.log(codes);
    throw new Error('Method not implemented.');
  }
}
