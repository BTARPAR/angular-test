import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'conditionalTitleCase'
})
export class ConditionalTitleCase implements PipeTransform {
  transform(val, condition): void {
    switch (condition) {
      case 'type':
      case 'name' :
        return val.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ');
      default:
        return val;
    }
  }
}
