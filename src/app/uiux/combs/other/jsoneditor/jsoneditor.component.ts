import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPage } from '@core/interface/IAppConfig';
import type { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import { BuilderService } from '@core/service/builder.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { Subject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import brandingSchema from './schema/branding.schema.json';
import builderSchema from './schema/builder.schema.json';
import coreSchema from './schema/core.schema.json';
import pageSchema from './schema/page.schema.json';
import componentSchema from './schema/component.schema.json';
import layoutBuilder from './schema/layoutBuilder.schema.json';
declare let window: any;
@Component({
  selector: 'app-jsoneditor',
  templateUrl: './jsoneditor.component.html',
  styleUrls: ['./jsoneditor.component.scss'],
  standalone: false,
})
export class JsoneditorComponent implements AfterViewInit {
  @Input() content: IJsoneditor;
  @ViewChild('jsoneditor', { read: ElementRef }) editor: ElementRef;
  public data: any;
  public value: any;
  public loading: boolean;
  private valueChange$: Subject<any> = new Subject<any>();

  private builder = inject(BuilderState);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private util = inject(UtilitiesService);
  private screenService = inject(ScreenService);
  private builderService = inject(BuilderService);

  ngAfterViewInit(): void {
    this.util.loadStyle('/assets/styles/jsoneditor/jsoneditor.min.css');
    const { schemaType = '', data } = this.content;
    this.data = data;
    if (this.screenService.isPlatformBrowser()) {
      let schema = {};
      switch (schemaType) {
        case '/core/builder':
          schema = builderSchema;
          break;
        case '/core/base':
          schema = coreSchema;
          break;
        case '/core/branding':
          schema = brandingSchema;
          break;
        case 'page':
          schema = pageSchema;
          break;
        case 'layout-builder':
          schema = layoutBuilder;
          break;
        case 'none':
          break;
        default:
          schema = componentSchema;
      }
      const editor = new window.JSONEditor(
        this.editor.nativeElement,
        {
          mode: 'code',
          enableSort: false,
          enableTransform: false,
          schema,
          onChange: () => {
            try {
              const json = editor.get();
              this.onChange(json);
            } catch (e) {}
          },
        },
        this.data
      );
    }
    this.valueChange$
      .pipe(debounceTime(1500), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.value = value;
        this.updateContent();
      });
  }

  onChange(event: any): void {
    if (event.timeStamp) {
      return;
    }

    this.loading = true;
    this.valueChange$.next(event);
    this.cd.detectChanges();
  }

  updateContent(): void {
    if (this.value) {
      const { isPage, path } = this.content;
      // for page json
      if (isPage) {
        const page: IPage = this.value;
        this.builder.setCurrentPage(page);
      }

      // for component json
      if (path) {
        this.builder.updatePageContentByPath(path, this.value);
      }

      this.loading = false;
      this.cd.detectChanges();
    }
  }

  onUpdateAttr(action: any): void {
    if (this.value) {
      const { isSetting } = this.content;
      this.loading = true;
      this.cd.detectChanges();
      const { uuid, langcode, api, type } = action.params;
      if (isSetting) {
        this.builderService
          .updateAttributes(
            {
              uuid,
              langcode,
            },
            api,
            {
              body: JSON.stringify(this.value),
            },
            {}
          )
          .pipe(
            catchError(err => {
              return of(false);
            }),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe(res => {
            if (!res) {
              this.util.openSnackbar('更新失败！', 'ok');
            } else {
              this.util.openSnackbar('更新成功！', 'ok');
              this.builder.closeRightDrawer$.next(true);
            }
            this.loading = false;
            this.cd.detectChanges();
          });
      }
    }
  }
}
