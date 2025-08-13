import { Component, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MappingService } from '../../services/mapping.service';
import { KbdComponent } from '../../shared/kbd/kbd.component';
import { Mapping, Mode } from '../../shared/shared.types';
import { ModeComponent } from '../mode/mode.component';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  imports: [KbdComponent, ModeComponent],
})
export class BottomBarComponent {
  mode = input.required<Mode>();

  mappings = signal<Mapping[]>([]);

  constructor() {
    inject(MappingService)
      .activeMenu.pipe(takeUntilDestroyed())
      .subscribe(mappings => {
        this.mappings.set(mappings);
      });
  }
}
