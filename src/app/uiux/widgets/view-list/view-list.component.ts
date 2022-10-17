import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IUser } from '@core/interface/IUser';
import { DialogService } from '@core/service/dialog.service';
import { FormService } from '@core/service/form.service';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { USER } from '@core/token/token-providers';
import { BaseComponent } from '@uiux/base/base.widget';
import { isEmpty, merge } from 'lodash-es';
import { of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewListComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  @Input() content: any;
  form = new FormGroup({
    page: new FormControl(),
  });
  model: any = {};
  searchEntry: any;
  table: any;
  loading: boolean;
  pager: any;
  noAuth: boolean;
  canShow = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  first = true;

  constructor(
    private nodeService: NodeService,
    private cd: ChangeDetectorRef,
    private formService: FormService,
    private dialogService: DialogService,
    private screenService: ScreenService,
    @Inject(USER) private user: IUser
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.afterClosedDialog();
    }
  }

  ngAfterViewInit(): void {
    const emptyHidden = this.getParams(this.content, 'emptyHidden');
    if (this.checkShow(this.content, this.user) && !emptyHidden) {
      this.canShow = true;
      this.cd.detectChanges();
    }
    if (this.first) {
      this.getViews();
      this.first = false;
    }
  }

  getViews(options = {}): void {
    const isRole = this.checkShow(this.content, this.user);
    if (!isRole) {
      this.canShow = false;
      this.cd.detectChanges();
      return;
    }
    const params = this.getApiParams(options);
    const emptyHidden = this.getParams(this.content, 'emptyHidden');
    this.loading = true;
    this.nodeService
      .search(this.content.params.apiType, params, this.user.csrf_token)
      .pipe(
        catchError((error: any) => {
          if (error.status === 403) {
            return of(false);
          }
          return of(error.status);
        })
      )
      .subscribe((res) => {
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
        this.pager = res.pager;
        this.loading = false;
        this.cd.detectChanges();
      });
  }

  afterClosedDialog(): void {
    if (this.dialogService.dialogState$) {
      this.dialogService.dialogState$.subscribe((state) => {
        if (!state) {
          this.getViews();
        }
      });
    }
  }

  clear(): void {
    this.form.reset();
  }

  onPageChange(page: number): void {
    this.form
      .get('page')
      ?.patchValue(page, { onlySelf: true, emitEvent: false });
    const value = merge(this.model, this.form.getRawValue());
    const options = this.formService.handleRangeDate(value);
    this.getViews(options);
  }

  onModelChange(value: any): void {
    this.form.get('page')?.patchValue(1, { onlySelf: true, emitEvent: false });
    const mergeValue = merge(value, this.form.getRawValue());
    const options = this.formService.handleRangeDate(mergeValue);
    this.getViews(options);
  }

  get containerClass(): string {
    return this.content.fullWidth ? 'container-fluid' : 'container';
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

  trackByFn(index: number, item: any): number {
    return index;
  }
}
