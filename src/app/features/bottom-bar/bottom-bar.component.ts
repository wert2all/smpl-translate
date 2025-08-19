import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { KbdComponent } from '../../shared/components/kbd/kbd.component';
import { MappingService } from '../../shared/services/mapping.service';
import { ModeService } from '../../shared/services/mode.service';
import { Mapping, Mode } from '../../shared/shared.types';
import { ModeComponent } from '../translate-container/mode/mode.component';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  imports: [KbdComponent, ModeComponent],
})
export class BottomBarComponent {
  private modeService = inject(ModeService);

  protected mode = toSignal(this.modeService.mode, {
    initialValue: Mode.insert,
  });

  mappings = signal<Mapping[]>([]);

  constructor() {
    inject(MappingService)
      .activeMenu.pipe(takeUntilDestroyed())
      .subscribe(mappings => {
        this.mappings.set(mappings);
      });
  }
}
