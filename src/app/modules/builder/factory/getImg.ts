import { FormlyFieldConfig } from '@ngx-formly/core';
import { getAspectRatio, getObjectFix } from './getCommon';

export function getImg(widget: any): FormlyFieldConfig {
  const fields = {
    key: 'img',
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          label: 'BUILDER.FACTORY.TAB_LABEL_IMG',
        },
        fieldGroupClassName: 'grid grid-cols-12 gap-3',
        fieldGroup: [
          {
            key: 'src',
            type: 'img-picker',
            className: 'col-span-12',
            defaultValue: widget.src ?? '',
            props: {
              updateLabel: 'BUILDER.FACTORY.IMG_UPDATE',
              addLabel: 'BUILDER.FACTORY.IMG_ADD',
              deleteLabel: 'BUILDER.FACTORY.IMG_DELETE',
              fileName: widget.src.split('/').pop(),
              alt: widget.alt ?? '',
            },
          },
          {
            key: 'alt',
            type: 'input',
            className: 'col-span-12',
            defaultValue: widget.alt,
            props: {
              label: 'BUILDER.FACTORY.ALT_DESC',
            },
          },
          {
            key: 'classes',
            type: 'input',
            className: 'col-span-6',
            defaultValue: widget.classes,
            props: {
              label: 'class',
            },
          },
          {
            key: 'hostClasses',
            type: 'input',
            className: 'col-span-6',
            defaultValue: widget.hostClasses,
            props: {
              label: 'Wrapper Class',
            },
          },
          {
            type: 'input',
            key: 'width',
            className: 'col-span-6',
            defaultValue: widget.width,
            props: {
              label: 'W',
              type: 'number',
            },
          },
          {
            type: 'input',
            key: 'height',
            className: 'col-span-6',
            defaultValue: widget.height,
            props: {
              label: 'H',
              type: 'number',
            },
          },
          {
            key: 'style',
            className: 'col-span-12',
            fieldGroupClassName: 'grid grid-cols-12 gap-3',
            fieldGroup: [
              {
                type: 'select',
                key: 'aspectRatio',
                className: 'col-span-6',
                defaultValue: widget?.style?.aspectRatio ?? 'auto',
                props: {
                  label: 'BUILDER.FACTORY.ASPECT_RATIO',
                  options: getAspectRatio,
                },
              },
              {
                type: 'select',
                key: 'objectFit',
                className: 'col-span-6',
                defaultValue: widget?.style?.objectFit ?? 'initial',
                props: {
                  label: 'BUILDER.FACTORY.FILL_TYPE',
                  options: getObjectFix,
                },
              },
            ],
          },
          {
            key: 'isLink',
            type: 'toggle',
            className: 'col-span-12',
            props: {
              label: 'BUILDER.FACTORY.IS_LINK',
            },
          },
          {
            key: 'href',
            className: 'col-span-12',
            defaultValue: widget.href,
            type: 'input',
            props: {
              label: 'BUILDER.FACTORY.LINK',
            },
            hideExpression: '!model.isLink',
          },
          {
            key: 'target',
            className: 'col-span-12',
            defaultValue: widget.target,
            type: 'select',
            props: {
              label: 'target',
              options: [
                {
                  label: 'BUILDER.FACTORY.NEW_PAGE',
                  value: '_blank',
                },
                {
                  label: 'BUILDER.FACTORY.CURRENT_PAGE',
                  value: '_self',
                },
              ],
            },
            hideExpression: '!model.isLink',
          },
        ],
      },
    ],
  };

  return fields;
}
