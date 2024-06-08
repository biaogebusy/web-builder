import { Pipe, PipeTransform } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';

@Pipe({
  name: 'dataSource',
})
export class DataSourcePipe implements PipeTransform {
  transform(array: any[]): any {
    return array ? new MatTableDataSource(array) : new MatTableDataSource([]);
  }
}
