import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  inject,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
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
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ViewListComponent extends BaseComponent implements OnInit, AfterViewInit {
  private user$ = inject<Observable<IUser>>(USER);

  @Input() content: IViewList;
  @Input() form = new UntypedFormGroup({
    page: new UntypedFormControl(0),
  });
  @Input() model: any = {};
  searchEntry: any;
  table: any;
  loading = true;
  pager: IPager;
  noAuth: boolean;
  canShow = false;
  first = true;
  user: IUser;

  cd = inject(ChangeDetectorRef);
  nodeService = inject(NodeService);
  formService = inject(FormService);
  dialogService = inject(DialogService);
  screenService = inject(ScreenService);
  userSerivice = inject(UserService);
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
      this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
        this.form.get('page')?.patchValue(0, { onlySelf: true, emitEvent: false });
        const mergeValue = merge(value, this.form.getRawValue());
        const options = this.formService.handleRangeDate(mergeValue);
        this.getViews(options);
      });
    }
  }

  ngAfterViewInit(): void {
    const api = this.getParams(this.content, 'apiType');
    if (!api) {
      this.transferStoryData(this);
      this.cd.detectChanges();
      return;
    }
    const emptyHidden = this.getParams(this.content, 'emptyHidden');
    if (this.userSerivice.checkShow(this.content, this.user) && !emptyHidden) {
      this.canShow = true;
      this.cd.detectChanges();
    }
    if (this.first) {
      this.getViews(this.form.value);
      this.first = false;
    }
  }

  getViews(options = {}): void {
    const isRole = this.userSerivice.checkShow(this.content, this.user);
    if (!isRole) {
      this.canShow = false;
      this.cd.detectChanges();
      return;
    }
    const params = this.getApiParams({ ...options, noCache: true });
    const emptyHidden = this.getParams(this.content, 'emptyHidden');
    this.loading = true;
    this.nodeService
      .fetch(this.content.params.apiType, params, this.user.csrf_token)
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
          header: this.content.header,
          elements: res.rows,
          classes: this.content?.tableClasses || '',
          params: this.content?.tableParams || {},
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
    this.form.reset();
  }

  onPageChange(pageEvent: PageEvent): void {
    const { pageIndex } = pageEvent;
    this.form.get('page')?.patchValue(pageIndex, { onlySelf: true, emitEvent: false });
    const value = merge(this.model, this.form.getRawValue());
    const options = this.formService.handleRangeDate(value);
    this.getViews(options);
  }

  onExport(): any {
    const mergeValue = merge(this.model, this.form.getRawValue());
    const options = this.formService.handleRangeDate(mergeValue);
    const apiParams = this.getApiParams(options);
    const params = this.content?.params;
    const btnContent = this.content?.params?.export?.btn;
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
