export enum LanguageCode {
  ua = 'ua',
  en = 'en',
  it = 'it',
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

export type Action = () => void;

export interface Mapping {
  keys: string[];
  description: string;
  action?: Action;
  mapping?: Mapping[];
}

export const MODIFIER_KEYS = new Set([
  'Control',
  'Alt',
  'Shift',
  'Meta',
  'CapsLock',
  'NumLock',
  'Home',
  'End',
  'PageUp',
  'PageDown',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Insert',
  'Delete',
  'Backspace',
  'Tab',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
]);

export enum DialogType {
  userLanguages = 'userLanguages',
  selectFromLanguage = 'selectFromLanguage',
  selectToLanguage = 'selectToLanguage',
}

export interface SelectOption {
  title: string;
  value: string;
  icon?: string;
  isSelected: boolean;
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
