import { Component, input, output } from '@angular/core';
import { ResizableTextAreaDirective } from '../directives/resizable.textarea.directive';
import { TextAreaSize } from '../shared.types';

@Component({
  selector: 'app-shared-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  imports: [ResizableTextAreaDirective],
})
export class TextareaComponent {
  text = input<string>();
  rows = input<number>(5);

  changeHeight = output<number>();

  resizeEvent(size: TextAreaSize) {
    this.changeHeight.emit(size.height);
  }
}
