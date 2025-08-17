import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Action } from '../shared.types';

@Injectable({ providedIn: 'root' })
export class ActionsService {
  actions = new Subject<Action>();

  fireAction(action: Action) {
    console.log('Action: ' + Action[action]);
    this.actions.next(action);
  }
}
