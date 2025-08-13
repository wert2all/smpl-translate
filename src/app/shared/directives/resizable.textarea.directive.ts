import {
  Directive,
  EventEmitter,
  HostListener,
  inject,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';
import { TextAreaSize } from '../shared.types';

@Directive({
  selector: 'textarea[resized]',
})
export class ResizableTextAreaDirective implements OnDestroy {
  @Output() resized = new EventEmitter<TextAreaSize>();

  private renderer = inject(Renderer2);
  private width = 0;
  private height = 0;

  private mouseMoveListener: (() => void) | undefined = undefined;

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
          this.resized.emit({ width: el.offsetWidth, height: el.offsetHeight });
        }
      }
    );
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
  }
}
