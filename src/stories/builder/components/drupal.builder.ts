import * as contactStory from '../../drupal/ContactUs.stories';
import * as calendarStory from '../../drupal/Full-calendar.stories';
import * as viewListStory from '../../drupal/ViewList.stories';
import * as treeListStory from '../../drupal/treeList.stories';
import * as viewMapStory from '../../drupal/ViewMap.stories';

const {
  Default: { args: viewMapDefault },
  Circle: { args: viewMapCircle, storyName: viewMapCircleName },
} = viewMapStory;

const {
  Default: { args: treeList },
} = treeListStory;

const {
  Default: { args: viewList },
} = viewListStory;
const {
  Default: { args: contact },
} = contactStory;

const {
  Default: { args: calendar },
} = calendarStory;

export const drupal = [
  contact,
  calendar,
  viewList,
  treeList,
  viewMapDefault,
  {
    ...viewMapCircle,
    name: viewMapCircleName,
  },
];
