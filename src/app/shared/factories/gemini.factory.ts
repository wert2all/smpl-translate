import { Injectable } from '@angular/core';
import {
  GenerativeModel,
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
} from 'firebase/ai';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GeminiFactory {
  create(model: string): GenerativeModel {
    const firebase = initializeApp(environment.services.firebase);
    const ai = getAI(firebase, { backend: new GoogleAIBackend() });

    return getGenerativeModel(ai, {
      model: model,
    });
  }
}
