import { FormlyFieldConfig } from '@ngx-formly/core';

export function getVideo(widget: any): FormlyFieldConfig {
  const options = widget?.options ?? {};
  const sources = Array.isArray(options.sources) ? options.sources : [];
  const fields = {
    key: 'video',
    type: 'tabs',
    fieldGroup: [
      {
        key: 'options',
        props: {
          label: 'BUILDER.FACTORY.TAB_LABEL_VIDEO',
        },
        fieldGroup: [
          {
            type: 'select',
            key: 'autoplay',
            defaultValue: options.autoplay,
            props: {
              label: 'BUILDER.FACTORY.AUTOPLAY',
              options: [
                {
                  label: 'BUILDER.FACTORY.NO',
                  value: false,
                },
                {
                  label: 'BUILDER.FACTORY.YES',
                  value: true,
                },
                {
                  label: 'BUILDER.FACTORY.PLAY_MUTED',
                  value: 'muted',
                },
              ],
            },
          },
          {
            type: 'toggle',
            key: 'loop',
            defaultValue: options.loop ?? false,
            props: {
              label: 'BUILDER.FACTORY.VIDEO_LOOP',
            },
          },
          {
            type: 'toggle',
            key: 'controls',
            defaultValue: options.controls ?? true,
            props: {
              label: 'BUILDER.FACTORY.VIDEO_CONTROLS',
            },
          },
          {
            type: 'select',
            key: 'mode',
            defaultValue: options.mode,
            props: {
              label: 'BUILDER.FACTORY.VIDEO_FIT',
              options: [
                {
                  label: 'BUILDER.FACTORY.NONE',
                  value: 'none',
                },
                {
                  label: 'BUILDER.FACTORY.VIDEO_FIT_COVER',
                  value: 'cover',
                },
                {
                  label: 'BUILDER.FACTORY.VIDEO_FIT_CONTAIN',
                  value: 'contain',
                },
              ],
            },
          },
          {
            type: 'toggle',
            key: 'fluid',
            defaultValue: options.fluid,
            props: {
              label: 'BUILDER.FACTORY.VIDEO_FLUID',
            },
          },
          {
            type: 'input',
            key: 'aspectRatio',
            className: 'w-full',
            defaultValue: options.aspectRatio,
            props: {
              label: 'BUILDER.FACTORY.VIDEO_RATIO',
              placeholder: 'BUILDER.FACTORY.VIDEO_RATIO_HINT',
            },
          },
          {
            key: 'poster',
            type: 'img-picker',
            className: 'w-full',
            defaultValue: options.poster,
            props: {
              updateLabel: 'BUILDER.FACTORY.POSTER_UPDATE',
              addLabel: 'BUILDER.FACTORY.POSTER_ADD',
              deleteLabel: 'BUILDER.FACTORY.POSTER_DELETE',
            },
          },
          {
            key: 'sources',
            type: 'repeat',
            defaultValue: sources,
            className: 'w-full',
            props: {
              addText: 'BUILDER.FACTORY.ADD_NEW',
            },
            fieldArray: {
              fieldGroup: [
                {
                  key: 'src',
                  type: 'input',
                  className: 'w-full',
                  defaultValue: sources[0]?.src ?? '',
                  props: {
                    label: 'BUILDER.FACTORY.VIDEO_URL',
                  },
                },
              ],
            },
          },
        ],
      },
    ],
  };

  return fields;
}
