import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { NodeFieldFormService } from '@core/service/node-field-form.service';
import { TagsService } from '@core/service/tags.service';
import { TranslateService } from '@ngx-translate/core';

/** 内容中心:聚合内容操作的固定入口(按类型发布、内容管理列表) */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-node-hub',
  templateUrl: './node-hub.component.html',
  styleUrl: './node-hub.component.scss',
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, RouterLink],
})
export class NodeHubComponent implements OnInit {
  private fieldFormService = inject(NodeFieldFormService);
  private tagsService = inject(TagsService);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  /** 发布入口开放的内容类型(默认清单 + core_config 增删) */
  public nodeTypes = signal<{ label: string; value: string }[]>([]);
  // getAllowedNodeTypes 出错时会发出空数组,需与"加载中"区分,避免骨架屏常驻
  public typesLoading = signal(true);

  ngOnInit(): void {
    this.tagsService.setTitle(this.translate.instant('BUILDER.NODE_HUB.PAGE_TITLE'));
    this.fieldFormService
      .getAllowedNodeTypes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(types => {
        this.nodeTypes.set(types);
        this.typesLoading.set(false);
      });
  }
}
