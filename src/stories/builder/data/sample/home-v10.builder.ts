import { hero1v3V1 } from '@stories/builder/data/combs/hero.builder';
import {
  showcase1v1_primary,
  showcase3v9_video,
} from '@stories/builder/data/combs/showcase.builder';
import {
  carousel1v3,
  carousel1v3_client,
} from '@stories/builder/data/combs/carousel.builder';
import { text } from '@stories/builder/data/combs/base.builder';
export const home_v10 = {
  title: '首页 v10',
  configBak: {
    headerMode: {
      transparent: true,
      style: 'light',
    },
  },
  meta: [
    {
      name: 'description',
      content: '',
    },
    {
      name: 'keywords',
      content: '',
    },
  ],
  body: [
    { ...hero1v3V1?.content },
    { ...showcase1v1_primary?.content },
    { ...showcase3v9_video?.content },
    {
      id: '',
      spacer: 'xl',
      type: 'showcase-3v9',
      bg: {
        classes: 'bg-fill-width',
        img: {
          src: '/assets/images/bg/bg-02.png',
        },
      },
      order: {
        left: 1,
        right: 0,
      },
      left: [
        {
          type: 'img',
          src: '/assets/images/illustration/12.png',
        },
      ],
      right: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: '组件展示和测试',
            style: 'style-v4',
            classes: 'mat-display-2',
          },
          body: 'Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。',
          actions: [{ href: '#', label: '马上体验' }],
        },
      ],
    },
    {
      id: '',
      spacer: 'xl',
      type: 'showcase-3v9',
      bg: {
        classes: 'bg-fill-width',
        img: {
          src: '/assets/images/bg/bg-01.png',
        },
      },
      order: {
        left: 0,
        right: 1,
      },
      left: [
        {
          type: 'img',
          src: '/assets/images/illustration/12.png',
        },
      ],
      right: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: '文档化',
            style: 'style-v4',
            classes: 'mat-display-2',
          },
          body: 'Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。<ul class="list-done">\r\n\t<li>使用Markdown或其他文档格式编写组件文档，并将其与组件关联</li>\r\n\t<li>团队成员可以更好地理解和使用组件，减少了沟通成本</li></ul>\r\n',
          actions: [{ href: '#', label: '马上体验' }],
        },
      ],
    },
    { ...carousel1v3_client?.content },
    { ...text?.content },
  ],
};
