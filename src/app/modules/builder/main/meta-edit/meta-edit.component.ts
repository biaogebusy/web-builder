import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NodeService } from '@core/service/node.service';
import { BuilderState } from '@core/state/BuilderState';
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
  viewHTML: any;
  editor: any;
  modules: QuillModule = {
    toolbar: [
      [
        {
          header: [1, 2, 3, 4, 5, 6, false],
        },
      ],
      ['bold', 'italic'],
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
    this.builder.selectedMedia$
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
    if (this.content.mode === 'img') {
      return;
    }
    const currentValue = get(this.builder.currentPage.body, this.content.path);
    const isSpanWrapper = this.isHTMLWrapper(currentValue);
    const div = document.createElement('div');
    const p = document.createElement('p');
    div.appendChild(p);

    if (isSpanWrapper) {
      p.outerHTML = currentValue;
    } else {
      p.innerHTML = currentValue;
    }

    const guiHTML = div.querySelector('p');
    if (this.content.ele.querySelector('p')) {
      this.viewHTML = this.content.ele.querySelector('p');
    } else {
      const text = this.content.ele.innerHTML;
      const p = document.createElement('p');
      p.innerHTML = text;
      p.style.display = 'inline-block';
      p.style.marginBottom = '0px';
      this.content.ele.innerHTML = p.outerHTML;
      this.viewHTML = this.content.ele.querySelector('p');
    }
    if (!guiHTML) {
      return;
    }
    guiHTML.style.display = 'inline-block';
    p.style.marginBottom = '0px';
    this.initGuiStyle(guiHTML, this.viewHTML);
    this.initGuiSize(guiHTML, this.viewHTML);
  }

  initGuiStyle(guiHTML: HTMLSpanElement, viewHTML: HTMLSpanElement): void {
    // 创建 dat.GUI 实例
    this.styleGuiUI = new dat.GUI();

    const styleParams = {
      颜色: guiHTML.style.color || '#222',
      背景色: guiHTML.style.backgroundColor || '#fff',
      透明度: parseFloat(guiHTML.style.opacity) || 1,
      字号: parseFloat(guiHTML.style.fontSize) || 16,
      旋转: 0,
    };

    this.styleFolder = this.styleGuiUI.addFolder('样式');
    this.styleFolder.open();
    this.styleFolder.addColor(styleParams, '颜色').onChange((value: any) => {
      viewHTML.style.color = value;
      guiHTML.style.color = value;
      this.setGuiSpan(guiHTML);
    });
    this.styleFolder.addColor(styleParams, '背景色').onChange((value: any) => {
      viewHTML.style.backgroundColor = value;
      guiHTML.style.backgroundColor = value;
      this.setGuiSpan(guiHTML);
    });
    this.styleFolder
      .add(styleParams, '透明度', 0, 1, 0.1)
      .onChange((value: any) => {
        viewHTML.style.opacity = value;
        guiHTML.style.opacity = value;
        this.setGuiSpan(guiHTML);
      });
    this.styleFolder
      .add(styleParams, '字号', 10, 60, 1)
      .onChange((value: any) => {
        viewHTML.style.fontSize = `${value}px`;
        guiHTML.style.fontSize = `${value}px`;
        this.setGuiSpan(guiHTML);
      });
    this.styleFolder
      .add(styleParams, '旋转', 0, 360, 1)
      .onChange((value: any) => {
        viewHTML.style.transform = `rotate(${value}deg)`;
        guiHTML.style.transform = `rotate(${value}deg)`;
        this.setGuiSpan(guiHTML);
      });

    this.guiStyle.nativeElement.appendChild(this.styleGuiUI.domElement);
  }

  initGuiSize(guiHTML: HTMLSpanElement, viewHTML: HTMLSpanElement): void {
    this.sizeGuiUI = new dat.GUI();
    const sizeParams = {
      宽度: guiHTML.style.width || 'auto',
      高度: guiHTML.style.height || 'auto',
      行高: guiHTML.style.lineHeight || '1.5',
      字间距: guiHTML.style.letterSpacing || '0',
    };
    this.sizeFolder = this.sizeGuiUI.addFolder('尺寸');
    this.sizeFolder.open();
    this.sizeFolder.add(sizeParams, '宽度').onChange((value: any) => {
      viewHTML.style.width = value;
      guiHTML.style.width = value;
      this.setGuiSpan(guiHTML);
    });
    this.sizeFolder.add(sizeParams, '高度').onChange((value: any) => {
      viewHTML.style.height = value;
      guiHTML.style.height = value;
      this.setGuiSpan(guiHTML);
    });
    this.sizeFolder.add(sizeParams, '行高').onChange((value: any) => {
      viewHTML.style.lineHeight = value;
      guiHTML.style.lineHeight = value;
      this.setGuiSpan(guiHTML);
    });
    this.sizeFolder.add(sizeParams, '字间距').onChange((value: any) => {
      viewHTML.style.letterSpacing = value;
      guiHTML.style.letterSpacing = value;
      this.setGuiSpan(guiHTML);
    });

    this.guiSize.nativeElement.appendChild(this.sizeGuiUI.domElement);
  }

  setGuiSpan(guiHTML: any): void {
    set(this.builder.currentPage.body, this.content.path, guiHTML.outerHTML);
    this.builder.saveLocalVersions();
    this.cd.detectChanges();
  }

  onClear(): void {
    this.viewHTML.removeAttribute('style');
    set(
      this.builder.currentPage.body,
      this.content.path,
      this.viewHTML.outerHTML
    );
    this.builder.saveLocalVersions();
    this.cd.detectChanges();
  }

  isHTMLWrapper(str: string): boolean {
    var pattern = /^<p[\s\S]*<\/p>$/;
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
    if (this.styleGuiUI) {
      this.styleGuiUI.removeFolder(this.styleFolder);
    }
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
