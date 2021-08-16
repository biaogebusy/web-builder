import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(private snackbar: MatSnackBar) {}

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
}
