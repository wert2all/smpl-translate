import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  createFailureState,
  createInitialState,
  createLoadingState,
  Language,
  State,
  TranslationResult,
} from '../shared.types';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  state = new BehaviorSubject<State<TranslationResult>>(
    createInitialState() as State<TranslationResult>
  );

  translate(
    text: string,
    from: Language | undefined,
    to: Language | undefined
  ) {
    this.state.next(createLoadingState() as State<TranslationResult>);
    setTimeout(() => {
      this.state.next(
        createFailureState(
          new Error(
            `could not translate '${text}' from ${from?.name} to ${to?.name} `
          )
        ) as State<TranslationResult>
      );
    }, 1000);
  }
}
