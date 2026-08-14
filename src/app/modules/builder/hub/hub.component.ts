import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { NodeFieldFormService, INodeTypeOption } from '@core/service/node-field-form.service';
import { TagsService } from '@core/service/tags.service';
import { UserService } from '@core/service/user.service';
import { USER } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { HUB_GROUPS } from './hub-entries';

/** 管理中心:聚合内容发布与各分散管理入口(内容、页面、外观、系统) */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.scss',
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, RouterLink],
})
export class HubComponent implements OnInit {
  private fieldFormService = inject(NodeFieldFormService);
  private tagsService = inject(TagsService);
  private translate = inject(TranslateService);
  private userService = inject(UserService);
  private user = inject(USER);
  private destroyRef = inject(DestroyRef);

  /**
   * 当前用户可见的分组。入口按角色过滤(受限路由由各自 guard 兜底),
   * 过滤后为空的分组整组不渲染,避免留下没有任何入口的孤儿标题。
   */
  public groups = computed(() => {
    const user = this.user();
    const resolvedUser = user && typeof user === 'object' ? user : undefined;
    return HUB_GROUPS.map(group => ({
      ...group,
      entries: group.entries.filter(entry =>
        this.userService.checkShow({ params: { reqRoles: entry.reqRoles ?? [] } }, resolvedUser)
      ),
    })).filter(group => group.entries.length > 0);
  });

  /** 发布入口开放的内容类型(默认清单 + core_config 增删) */
  public nodeTypes = signal<INodeTypeOption[]>([]);
  public typesLoading = signal(true);
  /** 加载失败与"站点没有可发布类型"是两种状态,文案和可用操作都不同 */
  public typesError = signal(false);
  /**
   * 骨架屏占位数量:按配置允许发布的类型数,而不是固定值,
   * 让加载完成后的真实卡片数尽量与占位一致,减少高度跳动。
   */
  public skeletonSlots = this.fieldFormService
    .getAllowedTypeNames()
    .map((_, index) => index);

  ngOnInit(): void {
    this.tagsService.setTitle(this.translate.instant('BUILDER.HUB.PAGE_TITLE'));
    this.loadNodeTypes();
  }

  onRetryTypes(): void {
    this.loadNodeTypes();
  }

  private loadNodeTypes(): void {
    this.typesLoading.set(true);
    this.typesError.set(false);
    this.fieldFormService
      .getAllowedNodeTypes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: types => {
          this.nodeTypes.set(types);
          this.typesLoading.set(false);
        },
        error: () => {
          this.typesError.set(true);
          this.typesLoading.set(false);
        },
      });
  }
}
