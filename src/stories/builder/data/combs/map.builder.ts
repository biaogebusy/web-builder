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
    content: {
      child: [
        {
          label: 'view-map',
          elements: [
            viewMapDefault,
            {
              ...viewMapCircle,
              name: viewMapCircleName,
            },
          ],
        },
      ],
    },
  },
  {
    content: {
      child: [
        {
          label: 'map-list',
          elements: [
            mapList1v1,
            { ...mapList1v1Sidebar, name: mapList1v1SidebarName },
          ],
        },
      ],
    },
  },
];
