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
import { StripTagsPipe } from 'ngx-pipes';
import { Observable, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-taxonomy',
  templateUrl: './taxonomy.component.html',
  styleUrl: './taxonomy.component.scss',
  providers: [StripTagsPipe],
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
  private stripTags = inject(StripTagsPipe);

  user$ = inject(USER);
  form = new FormGroup({});
  model: any = {};
  selectedItem: any;
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
    {
      key: 'description',
      fieldGroup: [
        {
          key: 'value',
          type: 'textarea',
          props: {
            label: '描述',
            placeholder: '请输入描述',
            rows: 3,
          },
        },
      ],
    },
    {
      key: 'weight',
      type: 'input',
      defaultValue: 0,
      props: {
        label: '权重',
        type: 'number',
        placeholder: '越小越靠前',
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

  onUpdate(value: any, user: any): void {
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
    if (!this.selectedItem) {
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
    } else {
      this.onSave(this.selectedItem, value);
    }
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

  onEdit(item: any): void {
    const {
      id,
      attributes: { name, description },
    } = item;
    this.selectedItem = item;
    this.form.patchValue({
      name,
      description: {
        value: description ? this.stripTags.transform(description.value) : '',
      },
    });
  }

  onSave(item: any, value: any): void {
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
          ...value,
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
          this.util.openSnackbar('更新成功！');
        } else {
          this.util.openSnackbar('更新失败！');
        }
      });
  }

  onReset(): void {
    this.form.reset();
    this.selectedItem = null;
  }
}
