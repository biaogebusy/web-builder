import { sleep, StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { userEvent } from '@storybook/testing-library';
import { TabComponent } from '@uiux/widgets/tab/tab.component';

export default {
  title: '基础组件/选项卡',
  id: 'tab',
  component: TabComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="position-relative" style="z-index:1">${story}</div>`
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
    text: {
      title: {
        label: '为什么你将会喜欢信使？',
        style: 'style-v4',
      },
    },
    classes: 'bg-light',
    elements: [
      {
        label: '高性能',
        elements: [
          {
            type: 'text',
            animate: {
              disable: true,
            },
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
            animate: {
              disable: true,
            },
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
            animate: {
              disable: true,
            },
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
            animate: {
              disable: true,
            },
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
            animate: {
              disable: true,
            },
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

export const Align = Template.bind({});

Align.args = {
  content: {
    type: 'tab',
    text: {
      title: {
        label: '为什么你将会喜欢信使？',
        style: 'style-v4',
      },
    },
    classes: 'bg-light',
    align: 'center',
    elements: [
      {
        label: '高性能',
        elements: [
          {
            type: 'text',
            animate: {
              disable: true,
            },
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
            animate: {
              disable: true,
            },
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
            animate: {
              disable: true,
            },
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
            animate: {
              disable: true,
            },
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
            animate: {
              disable: true,
            },
            spacer: 'none',
            body: '<p>为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；</p>',
          },
        ],
      },
    ],
  },
};

export const Pills = Template.bind({});

Pills.args = {
  content: {
    type: 'tab',
    text: {
      title: {
        label: '为什么你将会喜欢信使？',
        style: 'style-v1',
      },
      body: '<p>Github actions 从2019年就免费开放给个人开源项目使用，对于自动化开放测试部署，开发者一定非常的熟悉，如果把中间这项流程做好，不仅节省了大量的人力也大大加快了开发效率，在配置完善的情况下可以提高代码质量。</p>',
    },
    classes: 'bg-light',
    align: 'center',
    pills: true,
    elements: [
      {
        label: '高性能',
        elements: [
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
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
                src: '/assets/images/illustration/25.png',
                alt: '',
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '使用信使构建你们的项目',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
              },
              {
                type: 'swiper',
                params: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  navigation: false,
                },
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'card',
                    title: '高性能',
                    subTitle: 'High Performance',
                    avatar: {
                      src: '/assets/images/avatar/01.jpeg',
                      alt: '',
                    },
                    classes: 'card-no-shadow',
                    body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/02.jpeg',
                      alt: '',
                    },
                    title: '易用的编辑器',
                    subTitle: 'Simplicity for Editors',
                    classes: 'card-no-shadow',
                    body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/03.jpeg',
                      alt: '',
                    },
                    title: '多语言',
                    subTitle: 'Leader in Multilingual',
                    classes: 'card-no-shadow',
                    body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/04.jpeg',
                      alt: '',
                    },
                    title: '更有弹性',
                    subTitle: 'Flexibility',
                    classes: 'card-no-shadow',
                    body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/05.jpeg',
                      alt: '',
                    },
                    title: '安全性',
                    subTitle: 'Rigorous Security',
                    classes: 'card-no-shadow',
                    body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: '创意设计',
        elements: [
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
            order: {
              left: 1,
              right: 0,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/25.png',
                alt: '',
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '创意设计和干净整洁的代码',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
              },
              {
                type: 'swiper',
                params: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  navigation: false,
                },
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'card',
                    title: '高性能',
                    subTitle: 'High Performance',
                    avatar: {
                      src: '/assets/images/avatar/01.jpeg',
                      alt: '',
                    },
                    classes: 'card-no-shadow',
                    body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/02.jpeg',
                      alt: '',
                    },
                    title: '易用的编辑器',
                    subTitle: 'Simplicity for Editors',
                    classes: 'card-no-shadow',
                    body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/03.jpeg',
                      alt: '',
                    },
                    title: '多语言',
                    subTitle: 'Leader in Multilingual',
                    classes: 'card-no-shadow',
                    body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/04.jpeg',
                      alt: '',
                    },
                    title: '更有弹性',
                    subTitle: 'Flexibility',
                    classes: 'card-no-shadow',
                    body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/05.jpeg',
                      alt: '',
                    },
                    title: '安全性',
                    subTitle: 'Rigorous Security',
                    classes: 'card-no-shadow',
                    body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: '24小时支持',
        elements: [
          {
            id: '',
            type: 'showcase-3v9',
            spacer: 'xl',
            order: {
              left: 0,
              right: 1,
            },
            left: [
              {
                type: 'img',
                src: '/assets/images/illustration/29.png',
                alt: '',
              },
            ],
            right: [
              {
                type: 'text',
                spacer: 'sm',
                title: {
                  label: '应用24小时支持和响应',
                  style: 'style-v4',
                  classes: 'mat-display-2',
                },
                body: '信使是基于 Material UI 的 Angular 前端框架，后端适配 Drupal，提供优秀的数字创新体验。',
              },
              {
                type: 'swiper',
                params: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  navigation: false,
                },
                classes: 'p-bottom',
                elements: [
                  {
                    type: 'card',
                    title: '高性能',
                    subTitle: 'High Performance',
                    avatar: {
                      src: '/assets/images/avatar/01.jpeg',
                      alt: '',
                    },
                    classes: 'card-no-shadow',
                    body: '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/02.jpeg',
                      alt: '',
                    },
                    title: '易用的编辑器',
                    subTitle: 'Simplicity for Editors',
                    classes: 'card-no-shadow',
                    body: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/03.jpeg',
                      alt: '',
                    },
                    title: '多语言',
                    subTitle: 'Leader in Multilingual',
                    classes: 'card-no-shadow',
                    body: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/04.jpeg',
                      alt: '',
                    },
                    title: '更有弹性',
                    subTitle: 'Flexibility',
                    classes: 'card-no-shadow',
                    body: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
                  },
                  {
                    type: 'card',
                    avatar: {
                      src: '/assets/images/avatar/05.jpeg',
                      alt: '',
                    },
                    title: '安全性',
                    subTitle: 'Rigorous Security',
                    classes: 'card-no-shadow',
                    body: '为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
