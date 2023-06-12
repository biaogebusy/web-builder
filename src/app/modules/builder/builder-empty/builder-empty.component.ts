import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-builder-empty',
  templateUrl: './builder-empty.component.html',
  styleUrls: ['./builder-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderEmptyComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {
    this.content = {
      title: {
        label: '欢迎使用 Builder 快速构建页面',
        style: 'style-v1',
      },
      type: 'text',
      body: '<p>开启 <strong class="text-primary">Builder</strong> 后，可以从左侧选择组件拖动到想要的位置，甚至你可以在浏览前台任何页面时或者浏览 Storybook 页面时添加组件到预览页面，类似组件市场。</p><ul class="list-done"><li>可以快速复制整个页面的 JSON；</li><li>可以复制具体组件的 JSON；</li><li>可以直接编辑组件的 JSON，所见即所得；</li></ul><br><strong>拖动组件到以下区域预览！</strong>',
      spacer: 'lg',
      bg: { classes: 'bg-shadow bg-fill-width' },
      actionsAlign: 'center center',
    };
  }
}
