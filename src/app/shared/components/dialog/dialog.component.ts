import { Component, input } from '@angular/core';

@Component({
  selector: 'app-shared-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  title = input.required<string>();
}
