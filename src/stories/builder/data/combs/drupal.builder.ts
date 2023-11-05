import * as viewListStory from '@stories/drupal/ViewList.stories';
import * as treeListStory from '@stories/drupal/treeList.stories';

import * as questionStory from '@stories/sample/node/question.stories';
import * as list2v1Story from '@stories/components/list/List2v1.stories';
import * as taxonomyListStory from '@stories/components/list/taxonomyList.stories';
import * as taxonomyThinListStory from '@stories/components/list/taxonomyThinList.stories';

import * as contact1v1Story from '@stories/drupal/form/ContactUs1v1.stories';

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
  Default: { args: treeList },
} = treeListStory;

export const {
  Default: { args: viewList },
} = viewListStory;

export const {
  Default: { args: contact1v1 },
} = contact1v1Story;

export const drupal = [
  {
    label: '问答',
    ...question,
  },
  {
    label: '联系表单',
    ...contact1v1,
  },
  {
    label: '普通列表',
    ...list2v1,
  },
  {
    label: '分类列表',
    ...taxonomyList,
  },
  {
    label: '分类列表 Thin',
    ...taxonomyThinList,
  },
  {
    label: '视图列表',
    ...viewList,
  },
  {
    label: '树形列表',
    ...treeList,
  },
];
