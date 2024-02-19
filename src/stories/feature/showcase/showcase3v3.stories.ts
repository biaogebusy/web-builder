import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { Showcase3v3Component } from '@uiux/combs/showcase/showcase3v3/showcase3v3.component';
import { StorysModule } from '@core/module/storys.module';
import { IShowcase3v3 } from '@core/interface/combs/IShowcase';

export default {
  title: '特色组件/图文 Showcase/3v3',
  id: 'showcase-3v3',
  component: Showcase3v3Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) => `
      <div fxFlex.gt-sm="60" fxFlexOffset.gt-sm="20">
      ${story}
      </div>
    `
    ),
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
const content: IShowcase3v3 = {
  type: 'showcase-3v3',
  title: {
    label: 'Storybook 是什么？',
    href: '#',
  },
  spacer: 'none',
  bg: { classes: '' },
  classes: '',
  date: '12/09/2022',
  commentCount: '2',
  category: 'Angular',
  body: 'Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文。Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文。通过Storybook，您可以以交互的方式在浏览器中浏览和测试组件，以确保它们在各种条件下的正确工作。此外，您还可以使用Storybook提供的插件和工具来模拟数据、测试组件的不同状态和交互，并生成自动化测试报告。Storybook是一个用于构建、展示和文档化UI组件的工具。',
  details: {
    label: '查看更多',
    href: '#',
    type: 'btn',
    mode: 'raised',
    color: 'primary',
  },
};

Default.args = {
  content,
};

export const Image = Template.bind({});
Image.storyName = '图片';
const image: IShowcase3v3 = {
  ...Default.args.content,
  showImage: true,
  feature: {
    fullIcon: 'fullscreen',
    openIcon: 'open_in_new',
    ratios: 'media-16-9',
    link: '#',
    img: {
      classes: 'object-fit',
      src: '/assets/images/showcase/blog1-large.jpeg',
      alt: 'lazyload',
    },
  },
};
Image.args = {
  content: image,
};
