export enum LanguageCode {
  ua = 'ua',
  en = 'en',
}

export interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
}

export enum Mode {
  normal = 'normal',
  insert = 'insert',
  visual = 'visual',
}

export interface TextAreaSize {
  width: number;
  height: number;
}

export type State<T = unknown> =
  | { type: 'initial' }
  | { type: 'loading' }
  | { type: 'failure'; error: Error }
  | { type: 'success'; data: T };

export const createInitialState = (): State => ({ type: 'initial' });
export const createLoadingState = (): State => ({ type: 'loading' });
export const createFailureState = (error: Error): State => ({
  type: 'failure',
  error,
});
export const createSuccessState = <T>(data: T): State<T> => ({
  type: 'success',
  data,
});
