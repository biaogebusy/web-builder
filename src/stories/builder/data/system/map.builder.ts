import * as viewMapStory from '@stories/drupal/ViewMap.stories';

import * as mapList1v1Story from '@stories/components/map/mapList1v1.stories';

export const map = [
  {
    label: '地图应用',
    content: viewMapStory.Default?.args?.content,
  },
  {
    label: '地图圈',
    content: viewMapStory.Circle?.args?.content,
  },
  {
    label: '位置列表',
    content: mapList1v1Story.Default?.args?.content,
  },
];
