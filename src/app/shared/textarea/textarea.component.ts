import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { ResizableTextAreaDirective } from '../directives/resizable.textarea.directive';
import { TextAreaSize } from '../shared.types';

@Component({
  selector: 'app-shared-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  imports: [ResizableTextAreaDirective],
})
export class TextareaComponent {
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  text = input<string>();
  rows = input<number>(5);

  changeHeight = output<number>();
  unFocus = output<void>();

  resizeEvent(size: TextAreaSize) {
    this.changeHeight.emit(size.height);
  }

  focus() {
    this.textarea.nativeElement.focus();
  }
}
