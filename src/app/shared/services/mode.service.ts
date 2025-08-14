import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Mode } from '../../shared/shared.types';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  mode = new BehaviorSubject<Mode>(Mode.insert);

  update(mode: Mode) {
    this.mode.next(mode);
  }
}
