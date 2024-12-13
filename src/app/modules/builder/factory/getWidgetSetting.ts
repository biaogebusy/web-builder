import { FormlyFieldConfig } from '@ngx-formly/core';
import { getBtn } from './getBtn';
import { getBtnVideo } from './getBtnVideo';
import { getBuilder } from './getBuilder';
import { getChart } from './getChart';
import { getContact } from './getContact';
import { getDivider } from './getDivider';
import { getIcon } from './getIcon';
import { getImg } from './getImg';
import { getLink } from './getLink';
import { getNone } from './getNone';
import { getSpacer } from './getSpacer';
import { getSwiper } from './getSwiper';
import { getText } from './getText';
import { getTitle } from './getTitle';
import { getVideo } from './getVideo';

export function getWidgetSetting(widget: any) {
  let fields: FormlyFieldConfig;
  switch (widget.type) {
    case 'title':
      fields = getTitle(widget);
      break;
    case 'video':
      fields = getVideo(widget);
      break;
    case 'btn-video':
      fields = getBtnVideo(widget);
      break;
    case 'swiper':
      fields = getSwiper(widget);
      break;
    case 'link':
      fields = getLink(widget);
      break;
    case 'btn':
      fields = getBtn(widget);
      break;
    case 'spacer':
      fields = getSpacer(widget);
      break;
    case 'chart':
      fields = getChart(widget);
      break;
    case 'contact-us':
      fields = getContact(widget);
      break;
    case 'text':
      fields = getText(widget);
      break;
    case 'img':
      fields = getImg(widget);
      break;
    case 'icon':
      fields = getIcon(widget);
      break;
    case 'layout-builder':
      fields = getBuilder(widget);
      break;
    case 'divider':
      fields = getDivider(widget);
      break;
    default:
      fields = getNone(widget);
  }

  return fields;
}