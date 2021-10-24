import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {

  transform(value: string): string {
    if (value == 'M') return 'Masculino';
    if (value == 'F') return 'Feminino';
    return value;
  }

}
