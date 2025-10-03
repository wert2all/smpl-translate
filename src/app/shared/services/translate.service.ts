import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeminiFactory } from '../factories/gemini.factory';
import { PromptFactory } from '../factories/prompt.factory';
import {
  createFailureState,
  createInitialState,
  createLoadingState,
  createSuccessState,
  JsonAiResult,
  Language,
  State,
  TranslationResult,
} from '../shared.types';
import { Logger } from './logger.service';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private model = inject(GeminiFactory).create('gemini-flash-lite-latest');
  private promptBuilder = inject(PromptFactory);
  private logger = inject(Logger);

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
      if (!to) {
        throw "It's impossible to translate without knowing the target language.";
      }
      this.validateText(text);
      this.makeRequest(text, from, to);
    } catch (e) {
      this.createError(e);
    }
  }

  private createError(e: unknown) {
    this.state.next(
      createFailureState(new Error(e as string)) as State<TranslationResult>
    );
  }

  private async makeRequest(
    text: string,
    from: Language | undefined,
    to: Language
  ) {
    const prompt = this.promptBuilder.builder(text, to).setFrom(from).build();
    this.logger.log(this, 'prompt', prompt);

    const result = await this.model.generateContent(prompt);
    const jsonResult = JSON.parse(result.response.text());

    this.logger.log(this, 'result', result);
    this.logger.log(this, 'jsonResult', jsonResult);

    if (this.isJsonAiResult(jsonResult)) {
      this.state.next(
        createSuccessState<TranslationResult>({
          text: jsonResult.result.translation,
          from: from?.code,
          to: to?.code,
        })
      );

      this.logger.show();
    } else {
      throw 'Wrong API responce.';
    }
  }

  private validateText(text: string) {
    if (text.trim() == '') {
      throw 'could not translate empty text.';
    }
  }

  private isJsonAiResult(value: unknown): value is JsonAiResult {
    // Check if value is an object and not null
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const resultObj = value as Record<string, unknown>;
    if (
      typeof resultObj['result'] !== 'object' ||
      resultObj['result'] === null
    ) {
      return false;
    }

    const obj = resultObj['result'] as Record<string, unknown>;

    // Check required properties exist and are strings
    if (
      typeof obj['translation'] !== 'string' ||
      typeof obj['fromLanguage'] !== 'string' ||
      typeof obj['toLanguage'] !== 'string'
    ) {
      return false;
    }

    // Check optional error property if it exists
    return !(obj['error'] !== undefined && typeof obj['error'] !== 'string');
  }
}
