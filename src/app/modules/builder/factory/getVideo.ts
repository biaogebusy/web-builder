import { FormlyFieldConfig } from '@ngx-formly/core';

export function getVideo(widget: any, options?: any[]): FormlyFieldConfig[] {
  const fields = [
    {
      key: 'video',
      type: 'tabs',
      fieldGroup: [
        {
          key: 'options',
          props: {
            label: '视频',
          },
          fieldGroup: [
            {
              type: 'select',
              key: 'autoplay',
              defaultValue: widget.options.autoplay,
              props: {
                label: '自动播放',
                options: [
                  {
                    label: '否',
                    value: false,
                  },
                  {
                    label: '是',
                    value: true,
                  },
                  {
                    label: '播放并静音',
                    value: 'muted',
                  },
                ],
              },
            },
            {
              type: 'toggle',
              key: 'loop',
              defaultValue: widget.options.loop ?? false,
              props: {
                label: '循环播放',
              },
            },
            {
              type: 'toggle',
              key: 'controls',
              defaultValue: widget.options.controls ?? true,
              props: {
                label: '控制条',
              },
            },
            // {
            //   type: 'input',
            //   key: 'width',
            //   defaultValue: widget.options.width ?? 200,
            //   props: {
            //     label: 'W',
            //     type: 'number',
            //   },
            // },
            // {
            //   type: 'input',
            //   key: 'height',
            //   defaultValue: widget.options.height ?? 100,
            //   props: {
            //     label: 'H',
            //     type: 'number',
            //   },
            // },
            {
              type: 'select',
              key: 'mode',
              defaultValue: widget.options.mode,
              props: {
                label: '适配模式',
                options: [
                  {
                    label: '无',
                    value: 'none',
                  },
                  {
                    label: '按比例铺满',
                    value: 'cover',
                  },
                  {
                    label: '完整显示',
                    value: 'contain',
                  },
                ],
              },
            },
            {
              type: 'toggle',
              key: 'fluid',
              defaultValue: widget.options.fluid,
              props: {
                label: '自适应',
              },
            },
            {
              type: 'select',
              key: 'aspectRatio',
              className: 'w-full',
              defaultValue: widget.options.aspectRatio,
              props: {
                label: '播放比例',
                options: [
                  {
                    label: '16:9',
                    value: '16:9',
                  },
                  {
                    label: '6:19',
                    value: '6:19',
                  },
                  {
                    label: '4:3',
                    value: '4:3',
                  },
                  {
                    label: '1:1',
                    value: '1:1',
                  },
                ],
              },
            },
            {
              key: 'poster',
              type: 'img-picker',
              className: 'w-full',
              defaultValue: widget.options.poster,
              props: {
                updateLabel: '更新封面',
                addLabel: '设置封面',
                deleteLabel: '删除',
              },
            },
            {
              key: 'sources',
              type: 'repeat',
              defaultValue: widget.options.sources,
              className: 'w-full',
              props: {
                addText: '新增',
              },
              fieldArray: {
                fieldGroup: [
                  {
                    key: 'src',
                    type: 'input',
                    className: 'w-full',
                    defaultValue: widget.options.sources[0].src,
                    props: {
                      label: '视频地址',
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ];
  if (options) {
    fields[0].fieldGroup.push(...options);
  }

  return fields;
}
