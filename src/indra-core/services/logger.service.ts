import { Injectable, InjectionToken, Inject, Optional } from '@angular/core';

export const ERROR_LEVEL = new InjectionToken<number>('ERROR_LEVEL');

@Injectable()
export class LoggerService {
  private level: number = 5;

  constructor(@Optional() @Inject(ERROR_LEVEL) nivel: number) {
    if (nivel !== null) {
      this.level = nivel;
    }
   }

  public error(msg: string): void {
    if (this.level > 0) {
      console.error(msg);
    }
  }
  public warn(msg: string): void {
    if (this.level > 1) {
      console.warn(msg);
    }
  }
  public info(msg: string): void {
    if (this.level > 2) {
      // tslint:disable-next-line:no-console
      if (console.info) {
        // tslint:disable-next-line:no-console
        console.info(msg);
      } else {
        console.log(msg);
      }
    }
  }
  public log(msg: string): void {
    if (this.level > 3) {
      console.log(msg);
    }
  }

}
