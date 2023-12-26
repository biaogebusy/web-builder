import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { set } from 'lodash-es';
import { QuillModule } from 'ngx-quill';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-meta-edit',
  templateUrl: './meta-edit.component.html',
  styleUrls: ['./meta-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaEditComponent implements OnInit, OnDestroy {
  @Input() content: any;
  modules: QuillModule = {
    toolbar: [
      [
        {
          header: [1, 2, 3, 4, 5, 6, false],
        },
      ],
      ['bold', 'italic', 'underline', 'strike'],
      ['clean'],
      [
        {
          background: [],
        },
        {
          color: [],
        },
      ],
      [
        {
          align: [],
        },
      ],
      [
        {
          list: 'ordered',
        },
        {
          list: 'bullet',
        },
      ],
      [
        {
          indent: '-1',
        },
        {
          indent: '+1',
        },
      ],
      ['link'],
      ['blockquote', 'code-block'],
    ],
  };
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private dialog: MatDialog,
    private builder: BuilderState,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.builder.metaEditImaPath$
      .pipe(takeUntil(this.destroy$))
      .subscribe((img: any) => {
        const { src } = img;
        this.dialog.closeAll();
        this.content.data = img;
        set(this.builder.currentPage.body, this.content.path, src);
        this.content.ele.setAttribute('src', src);
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

  contentChanged(event: any): void {
    set(this.builder.currentPage.body, this.content.path, event.html);
    this.content.ele.innerHTML = event.html;
    setTimeout(() => {
      this.builder.saveLocalVersions();
    }, 600);
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
