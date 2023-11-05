import * as viewMapStory from '@stories/drupal/ViewMap.stories';

import * as mapList1v1Story from '@stories/components/map/mapList1v1.stories';

const {
  Default: { args: viewMapDefault },
  Circle: { args: viewMapCircle, storyName: viewMapCircleName },
} = viewMapStory;

const {
  Default: { args: mapList1v1 },
  Sidebar: { args: mapList1v1Sidebar, storyName: mapList1v1SidebarName },
} = mapList1v1Story;

export const map = [
  {
    label: '地图应用',
    ...viewMapDefault,
  },
  {
    label: viewMapCircleName,
    ...viewMapCircle,
  },
  {
    label: '位置列表',
    ...mapList1v1,
  },
  {
    label: mapList1v1SidebarName,
    ...mapList1v1Sidebar,
  },
];
