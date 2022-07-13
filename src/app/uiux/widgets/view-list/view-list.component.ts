import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { UserState } from '@core/mobx/user/UserState';
import { DialogService } from '@core/service/dialog.service';
import { FormService } from '@core/service/form.service';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { isEmpty } from 'lodash-es';
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
    start: new FormControl(''),
    end: new FormControl(''),
  });
  model: any = {};
  searchEntry: any;
  table: any;
  loading: boolean;
  pager: any;
  currentPageIndex = 0;
  noAuth: boolean;
  canShow = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  first = true;

  constructor(
    private nodeService: NodeService,
    public userState: UserState,
    private cd: ChangeDetectorRef,
    private formService: FormService,
    private dialogService: DialogService,
    private screenService: ScreenService
  ) {
    super(userState);
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.afterClosedDialog();
    }
  }

  ngAfterViewInit(): void {
    const emptyHidden = this.getParams(this.content, 'emptyHidden');
    if (this.checkShow(this.content) && !emptyHidden) {
      this.canShow = true;
      this.cd.detectChanges();
    }
    if (this.first) {
      this.getViews();
      this.first = false;
    }
  }

  getViews(options = {}): void {
    const isRole = this.checkShow(this.content);
    if (!isRole) {
      this.canShow = false;
      this.cd.detectChanges();
      return;
    }
    const params = this.getApiParams(options);
    const emptyHidden = this.getParams(this.content, 'emptyHidden');
    this.loading = true;
    this.nodeService
      .search(this.content.params.apiType, params, this.userState.csrfToken)
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

  clear(): void {
    this.form.reset();
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

  onPageChange(page: PageEvent): void {
    this.currentPageIndex = page.pageIndex;
    const options = this.formService.handleRangeDate(this.model);
    options.page = page.pageIndex;
    this.getViews(options);
  }

  onModelChange(value: any): void {
    const options = this.formService.handleRangeDate(value);
    this.currentPageIndex = 0;
    options.page = 0;
    this.getViews(options);
  }
}
