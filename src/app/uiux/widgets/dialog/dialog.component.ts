import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import type { IDialog } from '@core/interface/IDialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  data = inject<IDialog>(MAT_DIALOG_DATA);

  ngOnInit(): void {}
}
