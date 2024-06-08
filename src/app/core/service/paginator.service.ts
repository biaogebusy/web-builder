import { Injectable } from '@angular/core';
import { MatLegacyPaginatorIntl as MatPaginatorIntl } from '@angular/material/legacy-paginator';

@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = '每页';
  nextPageLabel = '下一页';
  previousPageLabel = '上一页';

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return '0 条 ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' 总共 ' + length + '条';
  };
}
