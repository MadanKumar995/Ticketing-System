import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value: any): any {
        if (value) {
            return formatDate(value, 'yyyy-MM-dd HH:mm', 'en-US');
        }
        return '';
    }
}
