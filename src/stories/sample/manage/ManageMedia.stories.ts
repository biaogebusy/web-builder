import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { StorysModule } from '@core/module/storys.module';
import { ManageModule } from '@modules/manage/manage.module';
import { ManageMediaComponent } from '@modules/manage/manage-media/manage-media.component';
import { FormGroup } from '@angular/forms';
import { MEDIA_ASSETS } from '@core/token/token-providers';
import { of } from 'rxjs';
import { mediaAssets } from '@stories/builder/data/assets/media-assets-for-story';

export default {
  title: '示例页面/中台管理/媒体库',
  id: 'manage-media',
  component: ManageMediaComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [ManageModule, StorysModule.forRoot()],
      providers: [
        {
          provide: MEDIA_ASSETS,
          useValue: of(mediaAssets),
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});

export const Default = {
  args: {
    content: {
      row: 4,
      sidebar: {
        title: { label: '搜索', style: 'style-v4', classes: 'mat-display-1' },
        action: {
          color: 'primary',
          mode: 'raised',
          label: '确定',
        },
        form: [
          {
            type: 'select',
            key: 'type',
            defaultValue: '/api/v1/file/file',
            className: 'display-block m-bottom-sm',
            templateOptions: {
              label: '选择资源类型',
              options: [
                {
                  label: '所有文件',
                  value: '/api/v1/file/file',
                },
                {
                  label: '图片库',
                  value: '/api/v1/media/image',
                },
                {
                  label: '文档库',
                  value: '/api/v1/media/document',
                },
                {
                  label: '视频库',
                  value: '/api/v1/media/video',
                },
              ],
            },
          },
          {
            type: 'select',
            key: 'limit',
            defaultValue: 20,
            className: 'display-block m-bottom-sm',
            templateOptions: {
              label: '每页显示个数',
              options: [
                {
                  label: '10',
                  value: 10,
                },
                {
                  label: '20',
                  value: 20,
                },
                {
                  label: '30',
                  value: 30,
                },
                {
                  label: '40',
                  value: 40,
                },
                {
                  label: '50',
                  value: 50,
                },
              ],
            },
          },
          {
            type: 'select',
            key: 'filter',
            defaultValue: 1,
            className: 'display-block m-bottom-sm',
            templateOptions: {
              label: '发布状态',
              options: [
                {
                  label: '已发布',
                  value: 1,
                },
                {
                  label: '未发布',
                  value: 0,
                },
              ],
            },
          },
          {
            key: 'sort',
            className: 'm-bottom-sm width-100',
            fieldGroup: [
              {
                type: 'select',
                key: 'field',
                defaultValue: 'created',
                className: 'display-block m-bottom-sm',
                templateOptions: {
                  label: '排序',
                  options: [
                    {
                      label: '创建时间',
                      value: 'created',
                    },
                    {
                      label: '用户ID',
                      value: 'uid',
                    },
                    {
                      label: '发布状态',
                      value: 'status',
                    },
                  ],
                },
              },
              {
                type: 'select',
                key: 'direction',
                defaultValue: 'DESC',
                className: 'display-block m-bottom-sm',
                templateOptions: {
                  label: '排序',
                  options: [
                    {
                      label: '最新发布的',
                      value: 'DESC',
                    },
                    {
                      label: '最旧发布的',
                      value: 'ASC',
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
    form: new FormGroup({}),
    model: {},
  },
};
