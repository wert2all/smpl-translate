import { Component, HostListener, inject } from '@angular/core';

import { MappingService } from './shared/services/mapping.service';
import { ModeService } from './shared/services/mode.service';
import { Mode } from './shared/shared.types';
import { TranslateContainerComponent } from './translate-container/translate-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [TranslateContainerComponent],
})
export class App {
  private modeService = inject(ModeService);
  private mappingService = inject(MappingService);

  @HostListener('document:keydown.escape')
  handleKeyboardEvent() {
    this.modeService.update(Mode.normal);
  }

  @HostListener('document:keydown.control.s', ['$event'])
  translate(e: Event) {
    e.preventDefault();
    console.log('translate');
  }

  @HostListener('document:keydown', ['$event.key'])
  onSpacePress(key: string) {
    this.mappingService.pressKey(key);
  }
}
