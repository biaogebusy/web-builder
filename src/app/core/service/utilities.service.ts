import { DOCUMENT, formatDate } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(
    private clipboard: Clipboard,
    private snackbar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document
  ) {}

  getIndexTitle(title: string): string {
    return title.substring(0, 1);
  }

  get fullYear(): number {
    return new Date().getFullYear();
  }

  openSnackbar(message: string, action = '', config?: MatSnackBarConfig): void {
    this.snackbar.open(
      message,
      action,
      config
        ? config
        : {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          }
    );
  }

  loadScript(src: string, id?: any, defer?: boolean): any {
    const script = this.document.createElement('script');
    script.src = src;
    script.async = true;
    if (defer) {
      script.defer = true;
    }
    if (id) {
      script.id = id;
    }
    this.document.body.appendChild(script);
  }

  getFileType(href: string): string {
    const url = href.toLowerCase();
    const pdfReg = /^.+(\.pdf)/;
    const txtReg = /^.+(\.txt)/;
    const wordReg = /^.+(\.doc|\.docx)/;
    const excelReg = /^.+(\.xls|\.xlsx)/;
    const jpgReg = /^.+(\.png|\.jpg|\.jpeg|\.bmp|\.gif|\.webp|\.svg)/;
    if (pdfReg.test(url)) {
      return 'pdf';
    }
    if (txtReg.test(url)) {
      return 'txt';
    }
    if (wordReg.test(url)) {
      return 'word';
    }
    if (excelReg.test(url)) {
      return 'excel';
    }
    if (jpgReg.test(url)) {
      return 'picture';
    }
    return '';
  }

  getDatesInRange(
    startDate: Date,
    endDate: Date,
    formarDate: string
  ): string[] {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(formatDate(date, formarDate, 'en-US'));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }

  copy(content: any): void {
    this.clipboard.copy(content);
  }
}
