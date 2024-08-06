import { Pipe, PipeTransform, Injectable  } from '@angular/core';

@Pipe({
  name: 'filter'
})

@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {

    if (!items) return [];
    
    
    if (!value || value.length == 0) return items;
    if (typeof items[0][field] === 'number')
    {
      return items.filter(it => it[field]==value);
    }
    else{
      return items.filter(it => it[field].toLowerCase().indexOf(value.toLowerCase()) != -1);
    }
  }
}
