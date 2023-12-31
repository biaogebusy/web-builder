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
  @ViewChild('guiStyle', { static: false }) guiStyle: ElementRef;
  @ViewChild('guiSize', { static: false }) guiSize: ElementRef;
  styleGuiUI: any;
  sizeGuiUI: any;
  styleFolder: any;
  sizeFolder: any;
  viewSpan: any;
  editor: any;
  modules: QuillModule = {
    toolbar: [
      [
        {
          header: [1, 2, 3, 4, 5, 6, false],
        },
      ],
      ['bold', 'italic', 'underline'],
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
      ['clean'],
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
    this.viewSpan = this.content.ele.querySelector('span') || this.content.ele;
    if (!guiSpan) {
      return;
    }
    guiSpan.style.display = 'inline-block';
    this.initGuiStyle(guiSpan, this.viewSpan);
    this.initGuiSize(guiSpan, this.viewSpan);
  }

  initGuiStyle(guiSpan: HTMLSpanElement, viewSpan: HTMLSpanElement): void {
    // 创建 dat.GUI 实例
    this.styleGuiUI = new dat.GUI();

    const styleParams = {
      颜色: guiSpan.style.color || '#222',
      背景色: guiSpan.style.backgroundColor || '#fff',
      透明度: parseFloat(guiSpan.style.opacity) || 1,
      字号: parseFloat(guiSpan.style.fontSize) || 16,
      旋转: 0,
    };

    this.styleFolder = this.styleGuiUI.addFolder('样式');
    this.styleFolder.open();
    this.styleFolder.addColor(styleParams, '颜色').onChange((value: any) => {
      viewSpan.style.color = value;
      guiSpan.style.color = value;
      this.setGuiSpan(guiSpan);
    });
    this.styleFolder.addColor(styleParams, '背景色').onChange((value: any) => {
      viewSpan.style.backgroundColor = value;
      guiSpan.style.backgroundColor = value;
      this.setGuiSpan(guiSpan);
    });
    this.styleFolder
      .add(styleParams, '透明度', 0, 1, 0.1)
      .onChange((value: any) => {
        viewSpan.style.opacity = value;
        guiSpan.style.opacity = value;
        this.setGuiSpan(guiSpan);
      });
    this.styleFolder
      .add(styleParams, '字号', 10, 60, 1)
      .onChange((value: any) => {
        viewSpan.style.fontSize = `${value}px`;
        guiSpan.style.fontSize = `${value}px`;
        this.setGuiSpan(guiSpan);
      });
    this.styleFolder
      .add(styleParams, '旋转', 0, 360, 1)
      .onChange((value: any) => {
        viewSpan.style.transform = `rotate(${value}deg)`;
        guiSpan.style.transform = `rotate(${value}deg)`;
        this.setGuiSpan(guiSpan);
      });

    this.guiStyle.nativeElement.appendChild(this.styleGuiUI.domElement);
  }

  initGuiSize(guiSpan: HTMLSpanElement, viewSpan: HTMLSpanElement): void {
    this.sizeGuiUI = new dat.GUI();
    const sizeParams = {
      宽度: guiSpan.style.width || 'auto',
      高度: guiSpan.style.height || 'auto',
      行高: guiSpan.style.lineHeight || '1.5',
      字间距: guiSpan.style.letterSpacing || '0',
    };
    this.sizeFolder = this.sizeGuiUI.addFolder('尺寸');
    this.sizeFolder.open();
    this.sizeFolder.add(sizeParams, '宽度').onChange((value: any) => {
      viewSpan.style.width = value;
      guiSpan.style.width = value;
      this.setGuiSpan(guiSpan);
    });
    this.sizeFolder.add(sizeParams, '高度').onChange((value: any) => {
      viewSpan.style.height = value;
      guiSpan.style.height = value;
      this.setGuiSpan(guiSpan);
    });
    this.sizeFolder.add(sizeParams, '行高').onChange((value: any) => {
      viewSpan.style.lineHeight = value;
      guiSpan.style.lineHeight = value;
      this.setGuiSpan(guiSpan);
    });
    this.sizeFolder.add(sizeParams, '字间距').onChange((value: any) => {
      viewSpan.style.letterSpacing = value;
      guiSpan.style.letterSpacing = value;
      this.setGuiSpan(guiSpan);
    });

    this.guiSize.nativeElement.appendChild(this.sizeGuiUI.domElement);
  }

  setGuiSpan(guiSpan: any): void {
    set(this.builder.currentPage.body, this.content.path, guiSpan.outerHTML);
    this.builder.saveLocalVersions();
    this.cd.detectChanges();
  }

  onClear(): void {
    const span = this.viewSpan.outerHTML;
    var spanContent = span.match(/<span[^>]*>([\s\S]+)<\/span>/i);
    if (spanContent) {
      this.viewSpan.removeAttribute('style');
      set(this.builder.currentPage.body, this.content.path, spanContent[1]);
      this.builder.saveLocalVersions();
    }
    this.cd.detectChanges();
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
    this.styleGuiUI.removeFolder(this.styleFolder);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
