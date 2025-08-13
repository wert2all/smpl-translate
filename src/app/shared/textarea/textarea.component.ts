import { Component, input } from '@angular/core';

@Component({
  selector: 'app-shared-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent {
  text = input<string>();
  rows = input<number>(5);
}
