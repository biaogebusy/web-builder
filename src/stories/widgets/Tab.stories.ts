import { sleep, StorysModule } from '@core/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { screen, userEvent } from '@storybook/testing-library';
import { TabComponent } from '@uiux/widgets/tab/tab.component';

export default {
  title: '基础/选项卡',
  id: 'tab',
  component: TabComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative p-x p-y" style="z-index:1">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    type: 'tab',
    title: {
      label: '为什么你将会喜欢信使？',
      style: 'style-v4',
    },
    classes: 'bg-light',
    elements: [
      {
        label: '高性能',
        elements: [
          {
            type: 'text',
            spacer: 'none',
            body: '<p>默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；</p>',
          },
        ],
      },
      {
        label: '易用的编辑器',
        elements: [
          {
            type: 'text',
            spacer: 'none',
            body: '<p>通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；</p>',
          },
        ],
      },
      {
        label: '多语言',
        elements: [
          {
            type: 'text',
            spacer: 'none',
            body: '<p>Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；</p>',
          },
        ],
      },
      {
        label: '更有弹性',
        elements: [
          {
            type: 'text',
            spacer: 'none',
            body: '<p>无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；</p>',
          },
        ],
      },
      {
        label: '安全性',
        elements: [
          {
            type: 'text',
            spacer: 'none',
            body: '<p>为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；</p>',
          },
        ],
      },
    ],
  },
};

Default.play = async () => {
  const tab = document.getElementsByClassName('mat-tab-label');

  await userEvent.click(tab[0]);
  await sleep(1000);

  await userEvent.click(tab[1]);
  await sleep(1000);

  await userEvent.click(tab[2]);
  await sleep(1000);

  await userEvent.click(tab[3]);
  await sleep(1000);

  await userEvent.click(tab[4]);
  await sleep(1000);
};
