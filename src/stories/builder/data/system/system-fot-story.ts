import * as notfoundStory from '@stories/sample/feedback/404.stories';
const {
  Default: { args: notfound },
} = notfoundStory;

export const systems: any[] = [
  {
    label: '基础',
    elements: [
      {
        label: '404',
        icon: { svg: 'text-search-variant' },
        ...notfound,
      },
    ],
  },
];
