import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ICardList, IPageList, IPageMeta } from '@core/interface/IBuilder';
import { IUser } from '@core/interface/IUser';
import { IPager } from '@core/interface/widgets/IWidgets';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { USER } from '@core/token/token-providers';
import { BaseComponent } from '@uiux/base/base.widget';
import { merge } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CardListComponent extends BaseComponent implements OnInit {
  private user$ = inject<Observable<IUser>>(USER);

  @Input() content: ICardList;
  content$: Observable<IPageMeta[]>;
  form = new FormGroup({
    page: new FormControl(0),
  });
  model: any = {
    noCache: true,
  };
  public loading = false;
  public pager: IPager;
  public langs = environment.langs;
  private builder = inject(BuilderState);
  private cd = inject(ChangeDetectorRef);
  private util = inject(UtilitiesService);
  private nodeService = inject(NodeService);
  private destroyRef = inject(DestroyRef);
  public user: IUser;

  constructor() {
    super();
    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.fetchPage('noCache=1');
    this.builder.updateSuccess$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(state => {
      if (state) {
        this.onReload();
      }
    });
  }

  onModelChange(value: any): void {
    this.form.get('page')?.patchValue(0, { onlySelf: true, emitEvent: false });
    const formValue = merge(value, this.form.getRawValue());
    const params = this.getApiParams({ ...formValue, noCache: 1 });
    this.fetchPage(params);
  }

  fetchPage(params: string): void {
    const {
      params: { api },
    } = this.content;
    this.loading = true;
    this.content$ = this.nodeService.fetch(api, params).pipe(
      catchError(error => {
        if (error.status === 404) {
          this.util.openSnackbar('请检查API是否已配置！', 'ok');
        }
        return of({
          rows: [],
          pager: {
            current_page: null,
            total_pages: 0,
            total_items: 0,
          },
        });
      }),
      map(res => {
        this.loading = false;
        this.cd.detectChanges();
        return this.getLists(res);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  getLists(res: IPageList): any[] {
    this.pager = this.handlerPager(res.pager, res.rows.length);
    this.cd.detectChanges();
    return res.rows;
  }

  onPageChange(page: PageEvent): void {
    this.form.get('page')?.patchValue(page.pageIndex, { onlySelf: true, emitEvent: false });
    const value = merge(this.model, this.form.getRawValue());
    const params = this.getApiParams(value);
    this.fetchPage(params);
  }

  onReload(): void {
    this.onModelChange({ title: '', time: +new Date() });
  }
}
