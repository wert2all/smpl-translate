import { Injectable } from '@angular/core';
import { Language } from '../shared.types';

@Injectable({ providedIn: 'root' })
export class PromptFactory {
  builder(text: string, to: Language): PromptBuilder {
    return new PromptBuilder(text, to);
  }
}
class PromptBuilder {
  private from: Language | undefined;

  constructor(
    private readonly text: string,
    private readonly to: Language
  ) {}

  setFrom(from: Language | undefined): PromptBuilder {
    this.from = from;
    return this;
  }

  build(): string {
    if (this.from) {
      return this.promptFromLanguage(this.from);
    } else {
      return this.promptWithDetection();
    }
  }
  private promptWithDetection(): string {
    return `First, identify the source language of the text provided below.
      Second, translate the text into ${this.to}.

      Format your response as:
      Detected Language: [Name of detected language]
      Translation: [The translated text]

      Text to Analyze:
      """
      ${this.text}
      """`;
  }

  private promptFromLanguage(from: Language): string {
    return `Translate the following text from ${from.name} to ${this.to.name}, following these specific instructions.

      Source Language: ${from.name}
      Target Language: ${this.to.name}

      Instructions:
      1. Do not translate the brand names/terms

      Text to Translate:
      """
      ${this.text}
      """`;
  }
}
