import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase2v4Component } from '@uiux/combs/showcase/showcase2v4/showcase2v4.component';
import { StorysModule } from '@core/module/storys.module';
import { IShowcase2v4 } from '@core/interface/combs/IShowcase';

export default {
  title: '特色组件/展示 Showcase/2v4',
  id: 'showcase-2v4',
  component: Showcase2v4Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
const content: IShowcase2v4 = {
  type: 'showcase-2v4',
  text: {
    title: {
      label: '本年度<strong class="text-primary">艺术作品</strong>代表作',
      style: 'style-v1',
      classes: 'mat-display-3 bold',
    },
    body: '<p class="text-center">突破传统的艺术边界，展示前卫和创新的艺术作品</p>',
  },
  spacer: 'md',
  bg: { classes: '' },
  classes: '',
  fullWidth: true,
  elements: [
    {
      type: 'content-box',
      width: '33.33',
      ratios: 'media-140',
      subTitle: {
        label: '《绝望之境》',
        href: '/search',
        queryParams: {
          law_category: 25,
        },
      },
      title: {
        label:
          '展现了作者内心深处的黑暗情绪，让观者深陷其中，感受到无尽的绝望与孤独。',
        href: '/search',
        queryParams: {
          law_category: 25,
        },
      },
      img: {
        classes: 'object-fit',
        src: '/assets/images/hero/1-6.jpg',
        alt: 'alt',
      },
    },
    {
      type: 'content-box',
      width: '33.33',
      ratios: 'media-140',
      subTitle: {
        label: '《色彩之舞》',
        href: '/search',
        queryParams: {
          law_category: 27,
        },
      },
      title: {
        label:
          '如同一幅绚丽的画卷，色彩的交织与流动呈现出动感和活力，令人心旷神怡。',
        href: '/search',
        queryParams: {
          law_category: 27,
        },
      },
      img: {
        classes: 'object-fit',
        src: '/assets/images/hero/182.jpg',
        alt: 'alt',
      },
    },
    {
      type: 'content-box',
      width: '33.33',
      ratios: 'media-140',
      subTitle: {
        label: '《时间的拥抱》',
        href: '/search',
        queryParams: {
          law_category: 13,
        },
      },
      title: {
        label:
          '将时间的概念与人类情感相融合，通过流动的线条和温暖的色调传递出对美好回忆的珍视与怀念。',
        href: '/search',
        queryParams: {
          law_category: 13,
        },
      },
      img: {
        classes: 'object-fit',
        src: '/assets/images/hero/329.jpg',
        alt: 'alt',
      },
    },
  ],
};
Default.args = {
  content,
};
