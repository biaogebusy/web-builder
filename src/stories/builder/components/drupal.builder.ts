import * as contactStory from '../../drupal/ContactUs.stories';
import * as calendarStory from '../../drupal/Full-calendar.stories';
import * as viewListStory from '../../drupal/ViewList.stories';
import * as treeListStory from '../../drupal/treeList.stories';
import * as viewMapStory from '../../drupal/ViewMap.stories';
import * as dashboardStory from '../../sample/dashboard/Dashboard.stories';
import * as articleStory from '../../sample/node/article.stories';
import * as questionStory from '../../sample/node/question.stories';
import * as list2v1Story from '../../components/list/List2v1.stories';
import * as taxonomyListStory from '../../components/list/taxonomyList.stories';
import * as taxonomyThinListStory from '../../components/list/taxonomyThinList.stories';
import * as mapList1v1Story from '../../components/map/mapList1v1.stories';

const {
  Default: { args: mapList1v1 },
  Sidebar: { args: mapList1v1Sidebar, storyName: mapList1v1SidebarName },
} = mapList1v1Story;
const {
  Default: { args: taxonomyThinList },
} = taxonomyThinListStory;
const {
  Default: { args: taxonomyList },
} = taxonomyListStory;
const {
  Default: { args: list2v1 },
} = list2v1Story;

const {
  Default: { args: question },
} = questionStory;

const {
  Comment: { args: article },
} = articleStory;

const {
  Order: { args: dashboard },
} = dashboardStory;

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
  article,
  question,
  contact,
  dashboard,
  calendar,
  list2v1,
  taxonomyList,
  taxonomyThinList,
  viewList,
  treeList,
  viewMapDefault,
  mapList1v1,
  { ...mapList1v1Sidebar, name: mapList1v1SidebarName },
  {
    ...viewMapCircle,
    name: viewMapCircleName,
  },
];
