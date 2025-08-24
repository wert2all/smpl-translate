import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EnvironmentType } from '../../../environments/environment.types';

interface LogData {
  object: string;
  name: string;
  value: string;
}

@Injectable({ providedIn: 'root' })
export class Logger {
  private logData: LogData[] = [];

  log(object: object, name: string, value: unknown) {
    this.logData.push({
      object: object.constructor.name,
      name,
      value: JSON.stringify(value),
    });
  }

  show() {
    if (environment.type == EnvironmentType.development) {
      console.table(this.logData);
    }
  }
}
