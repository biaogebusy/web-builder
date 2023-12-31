import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NodeService } from '@core/service/node.service';
import { BuilderState } from '@core/state/BuilderState';
import { USER } from '@core/token/token-providers';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { get, set } from 'lodash-es';
import { QuillModule } from 'ngx-quill';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import * as dat from 'dat.gui';

@Component({
  selector: 'app-meta-edit',
  templateUrl: './meta-edit.component.html',
  styleUrls: ['./meta-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaEditComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() content: any;
  @ViewChild('gui', { static: false }) gui: ElementRef;
  guiUI: any;
  StyleFolder: any;
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
      ['blockquote'],
    ],
  };
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private dialog: MatDialog,
    private builder: BuilderState,
    private nodeService: NodeService,
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

  ngAfterViewInit(): void {
    const currentValue = get(this.builder.currentPage.body, this.content.path);
    const isSpanWrapper = this.isSpanFormatted(currentValue);
    const div = document.createElement('div');
    const span = document.createElement('span');
    div.appendChild(span);

    if (isSpanWrapper) {
      span.outerHTML = currentValue;
    } else {
      span.innerHTML = currentValue;
    }

    const guiSpan = div.querySelector('span');
    const viewSpan = this.content.ele.querySelector('span') || this.content.ele;
    if (!guiSpan) {
      return;
    }
    guiSpan.style.display = 'inline-block';
    // 创建 dat.GUI 实例
    this.guiUI = new dat.GUI();

    const styleParams = {
      不透明度: parseFloat(guiSpan.style.opacity) || 1,
      大小: parseFloat(guiSpan.style.fontSize) || 16,
      颜色: guiSpan.style.color || '#222',
      可见性: guiSpan.style.visibility || 'visible',
      旋转: 0,
      对齐: guiSpan.style.textAlign || 'left',
    };

    this.StyleFolder = this.guiUI.addFolder('样式');
    this.StyleFolder.open();
    this.StyleFolder.add(styleParams, '不透明度', 0, 1, 0.1).onChange(
      (value: any) => {
        viewSpan.style.opacity = value;
        guiSpan.style.opacity = value;
        set(
          this.builder.currentPage.body,
          this.content.path,
          guiSpan.outerHTML
        );
        this.builder.saveLocalVersions();
      }
    );
    this.StyleFolder.add(styleParams, '大小', 10, 60, 1).onChange(
      (value: any) => {
        viewSpan.style.fontSize = `${value}px`;
        guiSpan.style.fontSize = `${value}px`;
        set(
          this.builder.currentPage.body,
          this.content.path,
          guiSpan.outerHTML
        );
        this.builder.saveLocalVersions();
      }
    );
    this.StyleFolder.addColor(styleParams, '颜色').onChange((value: any) => {
      viewSpan.style.color = value;
      guiSpan.style.color = value;
      set(this.builder.currentPage.body, this.content.path, guiSpan.outerHTML);
      this.builder.saveLocalVersions();
    });
    this.StyleFolder.add(styleParams, '可见性', ['visible', 'hidden']).onChange(
      (value: any) => {
        viewSpan.style.visibility = value;
        guiSpan.style.visibility = value;
        set(
          this.builder.currentPage.body,
          this.content.path,
          guiSpan.outerHTML
        );
        this.builder.saveLocalVersions();
      }
    );
    this.StyleFolder.add(styleParams, '旋转', 0, 360, 1).onChange(
      (value: any) => {
        viewSpan.style.transform = `rotate(${value}deg)`;
        guiSpan.style.transform = `rotate(${value}deg)`;
        set(
          this.builder.currentPage.body,
          this.content.path,
          guiSpan.outerHTML
        );
        this.builder.saveLocalVersions();
      }
    );

    this.StyleFolder.add(styleParams, '对齐', [
      'left',
      'center',
      'right',
    ]).onChange((value: any) => {
      viewSpan.style.textAlign = value;
      guiSpan.style.textAlign = value;
      set(this.builder.currentPage.body, this.content.path, guiSpan.outerHTML);
      this.builder.saveLocalVersions();
    });

    this.gui.nativeElement.appendChild(this.guiUI.domElement);
  }

  isSpanFormatted(str: string): boolean {
    var pattern = /^<span[\s\S]*<\/span>$/;
    return pattern.test(str);
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
    toolbar.addHandler(
      'image',
      this.nodeService.imageHandler.bind(this.nodeService, quill)
    );
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
    this.guiUI.removeFolder(this.StyleFolder);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
