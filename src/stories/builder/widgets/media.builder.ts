import * as mediaListStory from '../../widgets/media/MediaList.stories';
import * as mediaMetaStory from '../../widgets/media/MediaMeta.stories';
import * as mediaObjectStory from '../../widgets/media/MediaObject.stories';
import * as mediaObjectGroupStory from '../../widgets/media/MediaObjectGroup.stories';
import * as testimonialStory from '../../widgets/media/Testimonial.stories';

const {
  Default: { args: testimonial },
} = testimonialStory;

const {
  Default: { args: mediaObject },
} = mediaObjectStory;

const {
  Default: { args: mediaMeta },
} = mediaMetaStory;

const {
  Default: { args: mediaObjectGroup },
} = mediaObjectGroupStory;

const {
  Default: { args: mediaList },
} = mediaListStory;
export const medias = [
  {
    label: '列表',
    icon: { svg: 'format-list-checkbox' },
    ...mediaList,
  },
  {
    label: 'Meta',
    icon: { svg: 'format-list-text' },
    ...mediaMeta,
  },
  {
    label: '对象',
    icon: { svg: 'format-list-bulleted-type' },
    ...mediaObject,
  },
  {
    label: '对象组',
    icon: { svg: 'select-group' },
    ...mediaObjectGroup,
  },
  {
    label: '感言',
    icon: { svg: 'format-wrap-square' },
    ...testimonial,
  },
];
