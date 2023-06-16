import * as mediaListStory from '@stories/widgets/media/MediaList.stories';
import * as mediaMetaStory from '@stories/widgets/media/MediaMeta.stories';
import * as mediaObjectStory from '@stories/widgets/media/MediaObject.stories';
import * as mediaObjectGroupStory from '@stories/widgets/media/MediaObjectGroup.stories';
import * as testimonialStory from '@stories/widgets/media/Testimonial.stories';

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
