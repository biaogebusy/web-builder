import { Injectable, inject } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ILanguage } from '@core/interface/IEnvironment';
import { LANG } from '@core/token/token-providers';

@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = '每页';
  nextPageLabel = '下一页';
  previousPageLabel = '上一页';
  firstPageLabel = '首页';
  lastPageLabel = '尾页';

  private lang = inject<ILanguage>(LANG);

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    const { langCode } = this.lang;
    if (length === 0 || pageSize === 0) {
      return '0条 ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    if (langCode === 'en') {
      return startIndex + 1 + '-' + endIndex + ' of ' + length;
    } else {
      return startIndex + 1 + '-' + endIndex + ' 总共' + length + '条';
    }
  };
}
