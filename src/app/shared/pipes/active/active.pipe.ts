import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'active'
})
export class ActivePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? 'Si' : 'No'
  }

}
