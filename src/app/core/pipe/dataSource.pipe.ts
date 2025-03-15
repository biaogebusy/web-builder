import { Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Pipe({
    name: 'dataSource',
    standalone: false
})
export class DataSourcePipe implements PipeTransform {
  transform(array: any[]): any {
    return array ? new MatTableDataSource(array) : new MatTableDataSource([]);
  }
}
