import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  inject,
  ChangeDetectorRef,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { ITaxonomy } from '@core/interface/manage/ITaxonomy';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { USER } from '@core/token/token-providers';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-taxonomy',
  templateUrl: './taxonomy.component.html',
  styleUrl: './taxonomy.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxonomyComponent implements OnInit {
  @Input() content: ITaxonomy;
  items$: Observable<any>;
  loading = false;
  nodeService = inject(NodeService);
  util = inject(UtilitiesService);
  cd = inject(ChangeDetectorRef);
  builderSerivce = inject(BuilderService);
  private destroyRef = inject(DestroyRef);
  user$ = inject(USER);
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      props: {
        label: '名称',
        placeholder: '请输入名称',
        required: true,
      },
    },
  ];

  ngOnInit(): void {
    this.getItems('onCache=true');
  }

  getItems(params: string): void {
    this.loading = true;
    const {
      params: { api },
    } = this.content;
    this.items$ = this.nodeService.fetch(api, params).pipe(
      tap(() => {
        this.loading = false;
        this.cd.detectChanges();
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  onNew(value: any, user: any): void {
    if (!user) {
      this.util.openSnackbar('请登录！', 'ok');
      return;
    }
    const {
      params: { api },
    } = this.content;
    if (!this.form.valid) {
      this.util.openSnackbar('请填写分类名');
      return;
    }
    this.nodeService
      .addEntify(api, value, user.csrf_token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        catchError(() => {
          return of(false);
        })
      )
      .subscribe(res => {
        if (res) {
          this.getItems('noCache=true');
          this.form.reset();
        } else {
          this.util.openSnackbar('添加失败');
        }
        this.cd.detectChanges();
      });
  }

  onDelete(item: any, user: any): void {
    if (!user) {
      this.util.openSnackbar('请登录！', 'ok');
      return;
    }
    const {
      params: { api },
    } = this.content;
    this.nodeService
      .deleteEntity(api, item.id, user.csrf_token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.form.reset();
        this.util.openSnackbar('删除成功！', 'ok');
        this.getItems('noCache=true');
      });
  }

  onEdit(target: any, btn: any): void {
    target.classList.remove('hidden');
    target.classList.add('flex');

    btn.classList.remove('block');
    btn.classList.add('hidden');
  }

  onSave(item: any, value: any, editing: any, btn: any): void {
    const {
      id,
      attributes: { langcode },
    } = item;
    const {
      params: { api },
    } = this.content;
    console.log(value);
    this.loading = true;
    this.builderSerivce
      .updateAttributes(
        { uuid: id, langcode },
        api,
        {
          name: value,
        },
        {}
      )
      .pipe(
        catchError(() => {
          return of(false);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(res => {
        this.loading = false;
        this.cd.detectChanges();
        if (res) {
          this.form.reset();
          this.getItems('noCache=true');
          editing.classList.remove('flex');
          editing.classList.add('hidden');

          btn.classList.remove('hidden');
          btn.classList.add('block');
          this.util.openSnackbar('更新成功！');
        } else {
          this.util.openSnackbar('更新失败！');
        }
      });
  }
}
