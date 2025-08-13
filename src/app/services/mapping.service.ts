import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, filter, map, Subject, withLatestFrom } from 'rxjs';
import { Mapping, Mode, MODIFIER_KEYS } from '../shared/shared.types';
import { ModeService } from './mode.service';

@Injectable({
  providedIn: 'root',
})
export class MappingService {
  activeMenu = new BehaviorSubject<Mapping[]>([]);

  private modeService = inject(ModeService);
  private allMappings: Record<Mode, Mapping[]> = {
    [Mode.insert]: [
      {
        keys: ['esc'],
        description: 'normal mode',
      },
      {
        keys: ['ctrl', 's'],
        description: 'translate',
        action: () => {
          console.log('translate');
        },
      },
    ],
    [Mode.normal]: [
      {
        keys: ['space'],
        description: 'menu',
        mapping: [
          {
            keys: ['l'],
            description: 'language',
            mapping: [
              {
                keys: ['s'],
                description: 'switch language',
                action: () => {
                  console.log('switch language');
                },
              },
            ],
          },
        ],
      },
    ],
    [Mode.visual]: [],
  };
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
        const nextMenu = activeMenu.find(mapping => mapping.keys[0] == key);

        if (nextMenu && nextMenu.mapping) {
          this.activeMenu.next(nextMenu.mapping);
          return;
        }
        if (nextMenu && nextMenu.action) {
          nextMenu.action();
        }

        this.resetMenu(mode);
      });
  }

  pressKey(code: string) {
    this.keyPressed.next(code);
  }

  private resetMenu(mode: Mode) {
    this.activeMenu.next(this.allMappings[mode]);
  }
}
