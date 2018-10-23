import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'elipsis'
})
export class ElipsisPipe implements PipeTransform {
  transform(value: any, maxlen: number): any {
    return (!maxlen || !value || value.length < maxlen || value.length < 4)
      ? value : (value.substr(0, maxlen - 3) + '...');
  }
}

export const PIPES_CADENAS = [ElipsisPipe];
