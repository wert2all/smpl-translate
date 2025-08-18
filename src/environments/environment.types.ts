import { FirebaseOptions } from 'firebase/app';

export enum EnvironmentType {
  production = 'production',
  development = 'development',
}

export interface Environment {
  type: EnvironmentType;
  services: {
    firebase: FirebaseOptions;
  };
}
