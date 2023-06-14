import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BuilderState } from '@core/state/BuilderState';

@Component({
  selector: 'app-builder-generater',
  templateUrl: './builder-generater.component.html',
  styleUrls: ['./builder-generater.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderGeneraterComponent implements OnInit {
  @Input() content: any;
  form = new FormGroup({});
  model: any = {};
  constructor(private builder: BuilderState) {}

  ngOnInit(): void {
    this.content.form = [
      {
        type: 'select',
        key: 'hero',
        defaultValue: '1',
        className: 'display-block m-bottom-sm',
        templateOptions: {
          label: '选择 Hero 个数',
          description: '一般一个页面只需要一个 Hero',
          options: [
            {
              label: '1',
              value: 1,
            },
            {
              label: '2',
              value: 2,
            },
          ],
        },
      },
      {
        type: 'select',
        key: 'showcase',
        defaultValue: '3',
        className: 'display-block m-bottom-sm',
        templateOptions: {
          label: '选择 Showcase 个数',
          description: '一般一个页面会有多个 Showcase 组件',
          options: [
            {
              label: '1',
              value: 1,
            },
            {
              label: '2',
              value: 2,
            },
            {
              label: '3',
              value: 3,
            },
            {
              label: '4',
              value: 4,
            },
            {
              label: '5',
              value: 5,
            },
            {
              label: '6',
              value: 6,
            },
            {
              label: '7',
              value: 7,
            },
            {
              label: '8',
              value: 8,
            },
            {
              label: '9',
              value: 9,
            },
            {
              label: '10',
              value: 10,
            },
          ],
        },
      },
    ];
  }

  onGenerate(value: any): void {
    const items = [...this.content.components, ...this.content.widgets];
    console.log(value);
    const heros = this.builder.getRandomElements(items, 'Hero', value.hero);
    const showcases = this.builder.getRandomElements(
      items,
      'Showcase',
      value.showcase
    );

    this.builder.page.body = [...heros, ...showcases];
    this.builder.updatePage();
  }
}
