import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeminiFactory } from '../factories/gemini.factory';
import { PromptFactory } from '../factories/prompt.factory';
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
  private promptBuilder = inject(PromptFactory);

  state = new BehaviorSubject<State<TranslationResult>>(
    createInitialState() as State<TranslationResult>
  );

  async translate(
    text: string,
    from: Language | undefined,
    to: Language | undefined
  ) {
    this.state.next(createLoadingState() as State<TranslationResult>);
    if (to) {
      try {
        const prompt = this.promptBuilder
          .builder(text, to)
          .setFrom(from)
          .build();
        const result = await this.model.generateContent(prompt);

        this.state.next(
          createSuccessState<TranslationResult>({
            text: result.response.text(),
            from: from?.code,
            to: to?.code,
          })
        );
      } catch (e) {
        this.state.next(
          createFailureState(new Error(e as string)) as State<TranslationResult>
        );
      }
    } else {
      this.state.next(
        createFailureState(
          new Error(
            "It's impossible to translate without knowing the target language."
          )
        ) as State<TranslationResult>
      );
    }
  }
}
