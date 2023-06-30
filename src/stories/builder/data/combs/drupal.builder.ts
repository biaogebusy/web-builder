import * as contactStory from '@stories/drupal/ContactUs.stories';
import * as calendarStory from '@stories/drupal/Full-calendar.stories';
import * as viewListStory from '@stories/drupal/ViewList.stories';
import * as treeListStory from '@stories/drupal/treeList.stories';
import * as articleStory from '@stories/sample/node/article.stories';
import * as questionStory from '@stories/sample/node/question.stories';
import * as list2v1Story from '@stories/components/list/List2v1.stories';
import * as taxonomyListStory from '@stories/components/list/taxonomyList.stories';
import * as taxonomyThinListStory from '@stories/components/list/taxonomyThinList.stories';
import * as userCenterStory from '@stories/components/profile/userCenter.stories';
import * as searchStory from '@stories/components/search/Search.stories';

export const {
  Default: { args: search },
} = searchStory;
export const {
  Default: { args: userCenter },
} = userCenterStory;

export const {
  Default: { args: taxonomyThinList },
} = taxonomyThinListStory;
export const {
  Default: { args: taxonomyList },
} = taxonomyListStory;
export const {
  Default: { args: list2v1 },
} = list2v1Story;

export const {
  Default: { args: question },
} = questionStory;

export const {
  Comment: { args: article },
} = articleStory;

export const {
  Default: { args: treeList },
} = treeListStory;

export const {
  Default: { args: viewList },
} = viewListStory;
export const {
  Default: { args: contact },
} = contactStory;

export const {
  Default: { args: calendar },
} = calendarStory;

export const drupal = [
  search,
  article,
  question,
  contact,
  userCenter,
  calendar,
  list2v1,
  taxonomyList,
  taxonomyThinList,
  viewList,
  treeList,
];
