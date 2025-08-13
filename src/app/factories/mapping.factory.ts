import { Injectable } from '@angular/core';
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
                {
                  keys: ['f'],
                  description: 'change from language',
                  action: () => {
                    console.log('change from language');
                  },
                },
                {
                  keys: ['t'],
                  description: 'change to language',
                  action: () => {
                    console.log('change to language');
                  },
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
