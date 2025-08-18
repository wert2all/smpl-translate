import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeminiFactory } from '../factories/gemini.factory';
import {
  createFailureState,
  createInitialState,
  createLoadingState,
  createSuccessState,
  Language,
  State,
  TranslationResult,
} from '../shared.types';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private model = inject(GeminiFactory).create('gemini-2.5-flash');

  state = new BehaviorSubject<State<TranslationResult>>(
    createInitialState() as State<TranslationResult>
  );

  async translate(
    text: string,
    from: Language | undefined,
    to: Language | undefined
  ) {
    this.state.next(createLoadingState() as State<TranslationResult>);
    try {
      const prompt = `Translate from ${from?.name} to ${to?.name}: ${text}`;

      // To generate text output, call generateContent with the text input
      const result = await this.model.generateContent(prompt);

      const response = result.response;
      const translatedText = response.text();

      this.state.next(
        createSuccessState<TranslationResult>({
          text: translatedText,
          from: from?.code,
          to: to?.code,
        })
      );
    } catch (e) {
      console.log(e);
      this.state.next(
        createFailureState(new Error(e as string)) as State<TranslationResult>
      );
    }
  }
}
