import { Component, HostListener, inject } from '@angular/core';
import { ModeService } from './services/mode.service';
import { Mode } from './shared/shared.types';
import { TranslateContainerComponent } from './translate-container/translate-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [TranslateContainerComponent],
})
export class App {
  private modeService = inject(ModeService);

  @HostListener('document:keydown.escape')
  handleKeyboardEvent() {
    this.modeService.update(Mode.normal);
  }

  @HostListener('document:keydown.control.s', ['$event'])
  translate(e: Event) {
    e.preventDefault();
    console.log('translate');
  }
}
