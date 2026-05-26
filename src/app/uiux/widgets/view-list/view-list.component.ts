import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  inject,
  DestroyRef,
  input
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import type { IUser } from '@core/interface/IUser';
import type { IViewList } from '@core/interface/widgets/IViewList';
import { IPager } from '@core/interface/widgets/IWidgets';
import { DialogService } from '@core/service/dialog.service';
import { FormService } from '@core/service/form.service';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { UserService } from '@core/service/user.service';
import { USER } from '@core/token/token-providers';
import { BaseComponent } from '@uiux/base/base.widget';
import { isEmpty, merge } from 'lodash-es';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BtnComponent } from '../btn/btn.component';
import { DynamicComponentComponent } from '../builder/dynamic-component/dynamic-component.component';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';
import { TextComponent } from '../text/text.component';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    NgxSkeletonLoaderModule,
    TextComponent,
    BtnComponent,
    DynamicComponentComponent,
    DynamicTableComponent,
  ],
})
export class ViewListComponent extends BaseComponent implements OnInit, AfterViewInit {
  private user$ = inject<Observable<IUser>>(USER);

  readonly content = input<IViewList>();
  readonly form = input(new UntypedFormGroup({
    page: new UntypedFormControl(0),
}));
  readonly model = input<any>({});
  public table: any;
  public loading = true;
  public pager: IPager;
  public noAuth: boolean;
  public canShow = false;
  private first = true;
  private user: IUser;

  private cd = inject(ChangeDetectorRef);
  private nodeService = inject(NodeService);
  private formService = inject(FormService);
  private dialogService = inject(DialogService);
  private screenService = inject(ScreenService);
  private userSerivice = inject(UserService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    super();
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.afterClosedDialog();
      this.form().valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
        form.get('page')?.patchValue(0, { onlySelf: true, emitEvent: false });
        const mergeValue = merge(value, form.getRawValue());
        const options = this.formService.handleRangeDate(mergeValue);
        this.getViews(options);
      });
    }
  }

  ngAfterViewInit(): void {
    const emptyHidden = this.getParams(this.content(), 'emptyHidden');
    if (this.userSerivice.checkShow(this.content(), this.user) && !emptyHidden) {
      this.canShow = true;
      this.cd.detectChanges();
    }
    if (this.first) {
      this.getViews(this.form().value);
      this.first = false;
    }
  }

  getViews(options = {}): void {
    const isRole = this.userSerivice.checkShow(this.content(), this.user);
    if (!isRole) {
      this.canShow = false;
      this.cd.detectChanges();
      return;
    }
    const params = this.getApiParams({ ...options, noCache: true });
    const emptyHidden = this.getParams(this.content(), 'emptyHidden');
    this.loading = true;
    this.nodeService
      .fetch(this.content().params.apiType, params)
      .pipe(
        catchError((error: any) => {
          if (error.status === 403) {
            return of(false);
          }
          return of(error.status);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(res => {
        if (!res) {
          this.noAuth = true;
          this.loading = false;
          this.cd.detectChanges();
          return;
        }
        if (emptyHidden && isEmpty(res.rows)) {
          this.canShow = false;
          this.cd.detectChanges();
          return;
        }

        if (emptyHidden && !isEmpty(res.rows)) {
          this.canShow = true;
          this.cd.detectChanges();
        }
        this.table = {
          header: this.content().header,
          elements: res.rows,
          classes: this.content()?.tableClasses || '',
          params: this.content()?.tableParams || {},
        };
        this.pager = this.handlerPager(res.pager, res.rows.length);
        this.loading = false;
        this.cd.detectChanges();
      });
  }

  afterClosedDialog(): void {
    if (this.dialogService.dialogState$) {
      this.dialogService.dialogState$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(state => {
        if (!state) {
          this.getViews();
        }
      });
    }
  }

  clear(): void {
    this.form().reset();
  }

  onPageChange(pageEvent: PageEvent): void {
    const { pageIndex } = pageEvent;
    form.get('page')?.patchValue(pageIndex, { onlySelf: true, emitEvent: false });
    const value = merge(this.model(), form.getRawValue());
    const options = this.formService.handleRangeDate(value);
    this.getViews(options);
  }

  onExport(): any {
    const mergeValue = merge(this.model(), this.form().getRawValue());
    const options = this.formService.handleRangeDate(mergeValue);
    const apiParams = this.getApiParams(options);
    const content = this.content();
    const params = content?.params;
    const btnContent = content?.params?.export?.btn;
    let exportUrl = '';
    if (btnContent) {
      const api = params.apiType;
      if (api.startsWith('/api/')) {
        exportUrl = `/export/xlsx${api}`;
      } else {
        exportUrl = `/export/xlsx/api/v1/${api}`;
      }
      let href = btnContent.href || exportUrl;
      href = `${href}?${apiParams}`;
      window.open(href, '_blank');
    }
  }
}
