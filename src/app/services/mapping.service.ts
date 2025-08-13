import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, filter, map, Subject, withLatestFrom } from 'rxjs';
import { MappingFactory } from '../factories/mapping.factory';
import { Mapping, Mode, MODIFIER_KEYS } from '../shared/shared.types';
import { ModeService } from './mode.service';

@Injectable({
  providedIn: 'root',
})
export class MappingService {
  activeMenu = new BehaviorSubject<Mapping[]>([]);

  private modeService = inject(ModeService);
  private allMappings = inject(MappingFactory).createMapping();

  private keyPressed = new Subject<string>();
  private selectMenuData = this.keyPressed.pipe(
    filter(key => !MODIFIER_KEYS.has(key)),
    map(key => (key == ' ' ? 'space' : key)),
    withLatestFrom(this.activeMenu),
    withLatestFrom(this.modeService.mode),
    map(([[key, activeMenu], mode]) => ({ key, activeMenu, mode }))
  );

  constructor() {
    this.modeService.mode.pipe(takeUntilDestroyed()).subscribe(mode => {
      this.resetMenu(mode);
    });

    this.selectMenuData
      .pipe(takeUntilDestroyed())
      .subscribe(({ key, activeMenu, mode }) => {
        this.updateActiveMenu(key, activeMenu, mode);
      });
  }

  pressKey(code: string) {
    this.keyPressed.next(code);
  }

  private updateActiveMenu(key: string, activeMenu: Mapping[], mode: Mode) {
    const nextMenu = activeMenu.find(mapping => mapping.keys[0] == key);

    if (nextMenu && nextMenu.mapping) {
      this.activeMenu.next(nextMenu.mapping);
      return;
    }
    if (nextMenu && nextMenu.action) {
      nextMenu.action();
    }

    this.resetMenu(mode);
  }

  private resetMenu(mode: Mode) {
    this.activeMenu.next(this.allMappings[mode]);
  }
}
