import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import type { ILayoutSetting } from '@core/interface/IBuilder';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-layout-setting',
  templateUrl: './layout-setting.component.html',
  styleUrls: ['./layout-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSettingComponent implements OnInit, OnDestroy {
  @Input() content: ILayoutSetting;
  form = new FormGroup({});
  model: any = {};
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private builder: BuilderState,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.builder.selectedMedia$
      .pipe(takeUntil(this.destroy$))
      .subscribe((img: any) => {
        const { src, fileName } = img;
        const bg = {
          classes: 'bg-fill-width',
          img: {
            src,
            alt: fileName,
            classes: 'object-fit',
          },
        };
        this.content.content.bg = bg;
        this.dialog.closeAll();
        this.builder.builderLayoutSetting$.next({
          value: {
            bg,
          },
          index: this.content.index,
          uuid: this.content.uuid,
        });
        this.cd.detectChanges();
      });
  }

  onDeleteBgImg(): void {
    this.content.content.bg = {
      classes: 'bg-fill-width',
    };
    this.cd.detectChanges();
    this.builder.builderLayoutSetting$.next({
      value: {
        bg: {
          classes: 'bg-fill-width',
        },
      },
      index: this.content.index,
      uuid: this.content.uuid,
    });
  }

  onModelChange(value: any) {
    const { layoutAlign } = value;
    this.renderLayoutPreview(layoutAlign);
    this.builder.builderLayoutSetting$.next({
      value,
      index: this.content.index,
      uuid: this.content.uuid,
    });
  }

  renderLayoutPreview(layoutAlign: any): void {
    if (layoutAlign) {
      const { direction, horizontal, vertical } = layoutAlign;
      const box = this.el.nativeElement.querySelector('.wrapper');
      box.style.justifyContent = horizontal;
      box.style.alignItems = vertical;
      box.style.alignContent = vertical;
      box.style.flexDirection = direction;
    }
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

  showCode(): void {
    this.dialog.open(DialogComponent, {
      width: '1000px',
      data: {
        inputData: {
          content: {
            type: 'jsoneditor',
            index: this.content.index,
            isPreview: true,
            data: this.builder.currentPage.body[this.content.index],
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
