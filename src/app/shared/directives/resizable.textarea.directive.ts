import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';
import { TextAreaSize } from '../shared.types';

@Directive({
  selector: 'textarea[resize]',
})
export class ResizableTextAreaDirective {
  @Output() resize = new EventEmitter<TextAreaSize>();

  width: number = 0;
  height: number = 0;

  mouseMoveListener: Function | undefined;

  @HostListener('mousedown', ['$event.target'])
  onMouseDown(el: unknown) {
    if (!el || !(el instanceof HTMLTextAreaElement)) {
      return;
    }

    this.width = el.offsetWidth;
    this.height = el.offsetHeight;
    this.mouseMoveListener = this.renderer.listen(
      'document',
      'mousemove',
      () => {
        if (this.width !== el.offsetWidth || this.height !== el.offsetHeight) {
          this.resize.emit({ width: el.offsetWidth, height: el.offsetHeight });
        }
      }
    );
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.ngOnDestroy();
  }

  constructor(private renderer: Renderer2) {}

  ngOnDestroy() {
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
  }
}
