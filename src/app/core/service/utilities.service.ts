import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(
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
}
