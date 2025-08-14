import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogType } from '../shared/shared.types';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  readonly openWindow = new Subject<DialogType>();
}
