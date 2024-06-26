import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { IPager } from '@core/interface/widgets/IWidgets';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BaseComponent } from '@uiux/base/base.widget';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { merge } from 'lodash-es';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageListComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @Input() content: any;
  content$: Observable<any[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  links: any;
  form = new UntypedFormGroup({});
  model: any = {};
  loading = false;
  pager: IPager;
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      props: {
        label: '关键词',
        type: 'search',
      },
    },
    {
      type: 'input',
      key: 'page',
      className: 'hidden',
      props: {
        label: '页码',
      },
    },
  ];
  constructor(
    private nodeService: NodeService,
    private cd: ChangeDetectorRef,
    private builder: BuilderState,
    private util: UtilitiesService,
    private builderService: BuilderService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchPage();
  }

  onModelChange(value: any): void {
    this.loading = true;
    this.form.get('page')?.patchValue(1, { onlySelf: true, emitEvent: false });
    const formValue = merge(value, this.form.getRawValue());
    const params = this.getApiParams(formValue);
    this.fetchPage(params);
  }

  fetchPage(params?: string): void {
    this.content$ = this.nodeService
      .fetch('/api/v2/node/landing-page', params ?? '')
      .pipe(
        takeUntil(this.destroy$),
        map((res) => {
          this.loading = false;
          return this.getLists(res);
        }),
      );
  }

  getLists(res: any): any[] {
    this.pager = res.pager;
    this.cd.detectChanges();
    return res.rows.map((item: any) => {
      return {
        title: item.title,
        changed: item.changed,
        id: item.id,
        author: item.author,
        href: item.url,
      };
    });
  }

  loadPage(item: any): void {
    this.util.openSnackbar(`正在加载${item.title}`, 'ok');
    this.builder.loading$.next(true);
    this.builderService.loadPage(item.id);
  }

  onPageChange(page: number): void {
    this.form
      .get('page')
      ?.patchValue(page, { onlySelf: true, emitEvent: false });
    const value = merge(this.model, this.form.getRawValue());
    this.fetchPage(value);
  }

  onReload(): void {
    this.onModelChange({ title: '' });
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
