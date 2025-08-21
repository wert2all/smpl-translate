import { Injectable } from '@angular/core';
import {
  GenerativeModel,
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  Schema,
} from 'firebase/ai';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GeminiFactory {
  create(model: string): GenerativeModel {
    const firebase = initializeApp(environment.services.firebase);
    const ai = getAI(firebase, { backend: new GoogleAIBackend() });

    const jsonSchema = Schema.object({
      properties: {
        result: Schema.object({
          properties: {
            translation: Schema.string(),
            fromLanguage: Schema.string(),
            toLanguage: Schema.string(),
            error: Schema.string(),
          },
          optionalProperties: ['error'],
        }),
      },
    });

    return getGenerativeModel(ai, {
      model: model,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: jsonSchema,
      },
    });
  }
}
