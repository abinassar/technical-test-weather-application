import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const date = new Date(value);

    // Si el formato no es válido, devolver vacío o valor original
    if (isNaN(date.getTime())) return value;

    const pad = (n: number): string => n.toString().padStart(2, '0');

    const MM = pad(date.getMonth() + 1);
    const DD = pad(date.getDate());
    const YYYY = date.getFullYear();
    const HH = pad(date.getHours());
    const mm = pad(date.getMinutes());
    const SS = pad(date.getSeconds());

    return `${MM}/${DD}/${YYYY} ${HH}:${mm}:${SS}`;
  }
}
