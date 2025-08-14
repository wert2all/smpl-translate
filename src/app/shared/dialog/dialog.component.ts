import { Component, input } from '@angular/core';
import { ButtonComponent } from '../buttons/button/button.component';

@Component({
  selector: 'app-shared-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [ButtonComponent],
})
export class DialogComponent {
  title = input.required<string>();
}
