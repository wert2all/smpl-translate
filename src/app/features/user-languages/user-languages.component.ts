import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../shared/components/buttons/button/button.component';
import { ControlsComponent } from '../../shared/components/dialog/controls/controls.component';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-user-languages',
  templateUrl: './user-languages.component.html',
  imports: [DialogComponent, ControlsComponent, ButtonComponent],
})
export class UserLanguagesComponent {
  @ViewChild('userLanguagesDialog')
  private dialogElement!: ElementRef<HTMLDialogElement>;

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
