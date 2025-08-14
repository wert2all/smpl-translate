import { Action } from './shared.types';

export const SwitchLanguage: Action = () => {
  console.log('switch language');
};

export const ChangeFromLanguage: Action = () => {
  console.log('change from language');
};

export const ChangeToLanguage: Action = () => {
  console.log('change to language');
};

export const Translate: Action = () => {
  console.log('translate');
};

export const UserLanguages: Action = () => {
  console.log('user languages');
};
