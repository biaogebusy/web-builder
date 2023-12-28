import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '@core/interface/IUser';
import { NodeService } from '@core/service/node.service';
import { BuilderState } from '@core/state/BuilderState';
import { USER } from '@core/token/token-providers';
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
  editor: any;
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
      ['link', 'image'],
      ['blockquote', 'code-block'],
    ],
  };
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private dialog: MatDialog,
    private builder: BuilderState,
    private nodeService: NodeService,
    private cd: ChangeDetectorRef,
    @Inject(USER) private user: IUser
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

  editorCreated(quill: any) {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler.bind(this));
    this.editor = quill;
  }

  imageHandler() {
    const Imageinput: any = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute(
      'accept',
      'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
    );
    Imageinput.classList.add('ql-image');
    if (Imageinput.files) {
      Imageinput.addEventListener('change', () => {
        const file = Imageinput.files[0];
        if (file) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            const data = e.target.result;
            this.nodeService
              .uploadImage(file.name, data, this.user.csrf_token)
              .pipe(takeUntil(this.destroy$))
              .subscribe((img) => {
                const range = this.editor.getSelection(true);
                this.editor.insertEmbed(range.index, 'image', img);
              });
          };
          reader.readAsArrayBuffer(file);
        }
      });
      Imageinput.click();
    }
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
