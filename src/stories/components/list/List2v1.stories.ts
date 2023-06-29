import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { ListModule } from '@uiux/combs/list/list.module';
import { StorysModule } from '@core/module/storys.module';
import { List2v1Component } from '@uiux/combs/list/list2v1/list2v1.component';

export default {
  title: '复合组件/列表/2v1',
  id: 'list-2v1',
  component: List2v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [ListModule, StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => `${story}`),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'list-2v1',
    title: {
      label: '最新文章',
      style: 'style-v4',
      classes: 'mat-display-1',
    },
    params: {
      apiBak: '/api/v2/xxx',
    },
    more: {
      label: '查看更多',
      href: '#',
      mode: 'raised',
      color: 'primary',
    },
    elements: [
      {
        link: {
          label: 'ChartGPT：开启自动生成数据可视化的新时代',
          href: '#',
        },
        subTitle: '人工智能与数据科学',
        body: '探索ChartGPT，一种基于生成模型的技术，它能够自动从数据中生成精美的数据可视化图表。本文介绍了ChartGPT的工作原理、应用场景和潜在的影响，展示了它在数据分析和可视化领域的巨大潜力。',
        img: {
          src: '/assets/images/16-9/business-06.jpg',
          alt: '',
        },
      },
      {
        link: {
          label: 'ChartGPT vs. 传统数据可视化工具：新老对决',
          href: '#',
        },
        subTitle: '技术比较与评估',
        body: 'ChartGPT作为一种新兴的数据可视化技术，与传统的数据可视化工具展开竞争。本文比较了ChartGPT与传统工具在可视化质量、自动化程度和用户体验等方面的异同，并探讨了它们在不同场景下的适用性和优劣势。',
        img: {
          src: '/assets/images/16-9/business-07.jpg',
          alt: '',
        },
      },
      {
        link: {
          label: 'ChartGPT应用实践：数据洞察的新探索',
          href: '#',
        },
        subTitle: '数据分析与应用',
        body: '通过实际案例，本文展示了ChartGPT在数据洞察和决策支持方面的应用实践。从金融、市场营销到医疗健康，ChartGPT为数据分析师和决策者提供了一种创新的工具，帮助他们从海量数据中发现有价值的见解，并做出更准确的决策。',
        img: {
          src: '/assets/images/16-9/business-13.jpg',
          alt: '',
        },
      },
    ],
  },
};
