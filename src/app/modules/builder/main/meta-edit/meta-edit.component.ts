import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { set } from 'lodash-es';

@Component({
  selector: 'app-meta-edit',
  templateUrl: './meta-edit.component.html',
  styleUrls: ['./meta-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaEditComponent implements OnInit {
  @Input() content: any;
  constructor(
    private dialog: MatDialog,
    private builder: BuilderState,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.builder.metaEditImaPath$.subscribe((img: any) => {
      this.dialog.closeAll();
      this.content.data = img;
      set(this.builder.currentPage.body, this.content.path, img.src);
      setTimeout(() => {
        this.builder.saveLocalVersions();
      }, 600);
      this.cd.detectChanges();
    });
  }

  openMedias(): void {
    this.dialog.open(DialogComponent, {
      width: '100%',
      data: {
        title: '媒体库',
        inputData: {
          content: {
            type: 'manage-media',
          },
        },
      },
    });
  }
}
