import { hero1v4Default } from '@stories/builder/data/combs/hero.builder';
import {
  showcase3v9_reverse,
  showcase3v9_video,
} from '@stories/builder/data/combs/showcase.builder';
import { carousel1v3_client } from '@stories/builder/data/combs/carousel.builder';
import { text } from '@stories/builder/data/widgets/base.builder';

export const home_v7 = {
  title: '首页 v7',
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
    { ...hero1v4Default?.content },
    {
      type: 'showcase-1v1',
      title: {
        label: '忠实的客户',
        style: 'style-v2',
      },
      subTitle: {
        spacer: 'none',
        body: '<p class="text-center">可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。无论是一个还是多个站点，Drupal 总是可以游刃有余的构建。</p><br>',
      },
      bg: {
        classes: 'bg-shadow bg-fill-width',
      },
      row: '4',
      elements: [
        {
          img: {
            src: '/assets/images/logo/amazon.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '高性能',
          },
          content:
            '默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；',
          more: {
            href: '#',
            label: '+',
          },
        },
        {
          img: {
            src: '/assets/images/logo/shopify.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '易用的编辑器',
          },
          content: '通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；',
          more: {
            href: '#',
            label: '+',
          },
        },
        {
          img: {
            src: '/assets/images/logo/google.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '多语言',
          },
          content: 'Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； ',
          more: {
            href: '#',
            label: '+',
          },
        },
        {
          img: {
            src: '/assets/images/logo/lenovo.svg',
            alt: 'browser',
          },
          style: 'style-v3 use-image',
          title: {
            href: '#',
            label: '更有弹性',
          },
          content: '无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；',
          more: {
            href: '#',
            label: '+',
          },
        },
      ],
    },
    { ...showcase3v9_video?.content },
    { ...showcase3v9_reverse?.content },
    { ...carousel1v3_client?.content },
    { ...text?.content },
  ],
};
