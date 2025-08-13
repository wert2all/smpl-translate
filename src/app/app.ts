import { Component, HostListener } from '@angular/core';
import { TranslateContainerComponent } from './translate-container/translate-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [TranslateContainerComponent],
})
export class App {
  @HostListener('document:keydown.escape')
  handleKeyboardEvent() {
    console.log('swich to normal mode');
  }

  @HostListener('document:keydown.control.s', ['$event'])
  translate(e: Event) {
    e.preventDefault();
    console.log('translate');
  }
}
