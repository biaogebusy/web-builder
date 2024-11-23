import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
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
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { Subject, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-jsoneditor',
  templateUrl: './jsoneditor.component.html',
  styleUrls: ['./jsoneditor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsoneditorComponent implements OnInit, AfterViewInit {
  @Input() content: IJsoneditor;
  public editorOptions: JsonEditorOptions;
  public data: any;
  @ViewChild(JsonEditorComponent, { static: false })
  editor: JsonEditorComponent;
  value: any;
  loading: boolean;
  valueChange$: Subject<any> = new Subject<any>();

  private builder = inject(BuilderState);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private screenService = inject(ScreenService);
  private builderService = inject(BuilderService);
  private util = inject(UtilitiesService);
  constructor() {
    if (this.screenService.isPlatformBrowser()) {
      this.editorOptions = new JsonEditorOptions();
      this.editorOptions.mode = 'code'; // set only one mode
      this.editorOptions.enableTransform = false;
      this.editorOptions.enableSort = false;
    }
  }
  ngOnInit(): void {
    this.data = this.content.data;
  }

  ngAfterViewInit(): void {
    this.valueChange$
      .pipe(debounceTime(1500), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.value = value;
        this.updateCurrentPage();
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

  updateCurrentPage(): void {
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
