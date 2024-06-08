import * as hero1v1Story from '@stories/feature/hero/hero1v1.stories';
import * as hero1v2Story from '@stories/feature/hero/hero1v2.stories';
import * as hero1v4Story from '@stories/feature/hero/hero1v4.stories';
import * as hero2v1Story from '@stories/feature/hero/hero2v1.stories';
import * as hero2v2Story from '@stories/feature/hero/hero2v2.stories';
import * as hero2v3Story from '@stories/feature/hero/hero2v3.stories';

export const hero = [
  {
    label: 'V1',
    child: [
      {
        label: '1v1',
        content: hero1v1Story.Default?.args?.content,
      },
      {
        label: '1v2',
        content: hero1v2Story.Default?.args?.content,
      },
      {
        label: '1v4 Shape',
        content: hero1v4Story.Shape?.args?.content,
      },
    ],
  },
  {
    label: 'V2',
    child: [
      {
        label: '2v1',
        content: hero2v1Story.Default?.args?.content,
      },
      {
        label: 'Y中心 X自定义',
        content: hero2v1Story.YCenterXCustom?.args?.content,
      },
      {
        label: 'XY自定义',
        content: hero2v1Story.XYCustom?.args?.content,
      },
      {
        label: '2v2',
        content: hero2v2Story.Default?.args?.content,
      },
      {
        label: '2v3',
        content: hero2v3Story.Default?.args?.content,
      },
    ],
  },
];
