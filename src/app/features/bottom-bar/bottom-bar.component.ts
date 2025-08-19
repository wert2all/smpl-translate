import { Component, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { Subject, withLatestFrom } from 'rxjs';
import { KbdComponent } from '../../shared/components/kbd/kbd.component';
import { ActionsService } from '../../shared/services/actions.service';
import { MappingService } from '../../shared/services/mapping.service';
import { ModeService } from '../../shared/services/mode.service';
import { Action, Mapping, Mode } from '../../shared/shared.types';
import { ModeComponent } from '../translate-container/mode/mode.component';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  imports: [KbdComponent, ModeComponent],
})
export class BottomBarComponent {
  private modeService = inject(ModeService);
  private mappingService = inject(MappingService);
  private actionsService = inject(ActionsService);

  protected mode = toSignal(this.modeService.mode, {
    initialValue: Mode.insert,
  });
  protected mappings = signal<Mapping[]>([]);

  private switchInsertMode = new Subject<void>();

  constructor() {
    this.mappingService.activeMenu
      .pipe(takeUntilDestroyed())
      .subscribe(mappings => {
        this.mappings.set(mappings);
      });

    this.switchInsertMode
      .pipe(takeUntilDestroyed(), withLatestFrom(this.modeService.mode))
      .subscribe(([, mode]) => {
        if (mode == Mode.normal) {
          this.modeService.update(Mode.insert);
        }
      });
  }

  @HostListener('document:keydown.control.s', ['$event'])
  translate(e: Event) {
    e.preventDefault();
    this.actionsService.fireAction(Action.Translate);
  }

  @HostListener('document:keydown.i')
  handleIPress() {
    this.switchInsertMode.next();
  }

  @HostListener('document:keydown.escape')
  handleEscPress() {
    this.modeService.update(Mode.normal);
  }

  @HostListener('document:keydown', ['$event.key'])
  handleSpacePress(key: string) {
    this.mappingService.pressKey(key);
  }
}
