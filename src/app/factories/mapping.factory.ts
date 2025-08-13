import { Injectable } from '@angular/core';
import {
  ChangeFromLanguage,
  ChangeToLanguage,
  SwitchLanguage,
  Translate,
} from '../shared/shared.actions';
import { Mapping, Mode } from '../shared/shared.types';

@Injectable({
  providedIn: 'root',
})
export class MappingFactory {
  createMapping(): Record<Mode, Mapping[]> {
    return {
      [Mode.insert]: [
        {
          keys: ['esc'],
          description: 'normal mode',
        },
        {
          keys: ['ctrl', 's'],
          description: 'translate',
          action: Translate,
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
                  action: SwitchLanguage,
                },
                {
                  keys: ['f'],
                  description: 'change from language',
                  action: ChangeFromLanguage,
                },
                {
                  keys: ['t'],
                  description: 'change to language',
                  action: ChangeToLanguage,
                },
              ],
            },
          ],
        },
      ],
      [Mode.visual]: [],
    };
  }
}
