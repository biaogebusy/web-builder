import { Component, DestroyRef, OnInit, computed, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { FORM_IMPORTS } from '@uiux/combs/form/form-imports';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { IUser } from '@core/interface/IUser';
import { NodeService } from '@core/service/node.service';
import { INodeFieldMeta, NodeFieldFormService } from '@core/service/node-field-form.service';
import { TagsService } from '@core/service/tags.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { USER } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-node-add',
  templateUrl: './node-add.component.html',
  styleUrl: './node-add.component.scss',
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, FORM_IMPORTS, FormlyModule, FormlyMaterialModule],
})
export class NodeAddComponent implements OnInit {
  private nodeService = inject(NodeService);
  private fieldFormService = inject(NodeFieldFormService);
  private tagsService = inject(TagsService);
  private activateRoute = inject(ActivatedRoute);
  public user = inject(USER);
  private util = inject(UtilitiesService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);
  public type = signal<string>('');
  public form: UntypedFormGroup = new UntypedFormGroup({});
  public fields = signal<FormlyFieldConfig[]>([]);
  public nodeTypes = signal<{ label: string; value: string }[]>([]);
  /** 当前类型的显示名(如 "博客"),未匹配时回退机器名 */
  public typeLabel = computed(
    () => this.nodeTypes().find(t => t.value === this.type())?.label ?? this.type()
  );
  private fieldMeta: INodeFieldMeta[] = [];

  ngOnInit(): void {
    this.fieldFormService
      .getNodeTypes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(types => this.nodeTypes.set(types));

    this.activateRoute.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const type = params['type'];
      this.tagsService.setTitle(this.translate.instant('BUILDER.NODE_ADD.CREATE_TITLE', { type }));
      this.type.set(type);
      // 切换类型时销毁旧表单(app-formly 只在创建时快照 fields)
      this.fields.set([]);
      this.form = new UntypedFormGroup({});

      switch (type) {
        case 'json':
          this.fields.set([
            this.getTitleField(),
            {
              key: 'body',
              type: 'json',
              props: {
                label: 'JSON',
                required: true,
                rows: 10,
              },
            },
          ]);
          break;
        default:
          // 通过 field config API 内省该内容类型的字段,动态生成表单
          this.fieldFormService
            .getForm(type)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(({ fields, meta }) => {
              this.fieldMeta = meta;
              this.fields.set([this.getTitleField(), ...fields]);
              // field_config 需要 administer node fields 权限,无权限时 data 为空
              if (fields.length === 0) {
                this.util.openSnackbar(
                  this.translate.instant('BUILDER.NODE_ADD.NO_FIELDS'),
                  'ok'
                );
              }
            });
      }
    });
  }

  switchType(type: string): void {
    if (type !== this.type()) {
      this.router.navigate(['/builder/node-add', type]);
    }
  }

  private getTitleField(): FormlyFieldConfig {
    return {
      key: 'title',
      type: 'input',
      props: {
        label: this.translate.instant('BUILDER.NODE_ADD.FIELD_TITLE'),
        required: true,
      },
    };
  }

  onSubmit(value: any, user: IUser | any): void {
    if (!user) {
      this.util.openSnackbar(this.translate.instant('BUILDER.NODE_ADD.LOGIN_FIRST'), 'ok');
      return;
    }
    const type = this.type();
    switch (type) {
      case 'json': {
        const { title, body } = value;
        this.nodeService
          .addEntity(`/api/v1/node/${type}`, {
            title,
            status: true,
            body: JSON.stringify(body),
          })
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.router.navigate(['/builder/settings']);
          });
        break;
      }
      default: {
        const { title, ...rest } = value;
        const { attributes, relationships } = this.fieldFormService.buildPayload(
          this.fieldMeta,
          rest
        );
        this.nodeService
          .addEntity(
            `/api/v1/node/${type}`,
            {
              title,
              status: true,
              ...attributes,
            },
            relationships
          )
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.router.navigate(['/builder/settings']);
          });
      }
    }
  }
}
