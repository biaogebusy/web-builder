import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockComponent } from '@uiux/combs/block/block/block.component';
import { BlockModule } from '@uiux/combs/block/block.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { of } from 'rxjs';
import { BRANDING } from '@core/token/token-providers';
import { defaultHeader, footerInverse } from '../../global/Branding.json';
export default {
  title: '示例页面/产品介绍/01 自动播放动画',
  id: 'product-v1',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [BlockModule, BrandingModule, StorysModule.forRoot()],
      providers: [
        {
          provide: BRANDING,
          useValue: of({
            header: defaultHeader,
            footer: footerInverse,
          }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
    <app-header></app-header>
    ${story}
    <app-footer></app-footer>
    `
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Page = Template.bind({});
// Raname Story
Page.storyName = '预览';
const content = of({
  title: 'SY002 | Kingzone',
  body: [
    {
      type: 'hero-2v1',
      theme: 'text-light',
      params: {
        height: '940px',
      },
      text: {
        title: {
          label: 'THE PERFECT BALANCE OF QUALITY AND COMFORT',
          style: 'style-v4',
          classes: 'mat-display-1 bold',
        },
        spacer: 'md',
        style: {
          width: '31%',
          left: '65%',
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/SY002_02.jpg?itok=d3rcKwK8',
            mobile: '/assets/images/products/SY002-Phone_02.jpg?itok=tQgh3iAj',
          },
        },
        body: '<p><span style="font-size:18px;">Made of aluminum alloy, with anodizing&nbsp;or rubber paint spraying process, adding durability and fashion.&nbsp;Ergonomic&nbsp;design for comfortable hand feel.</span></p>\r\n',
      },
    },
    {
      type: 'hero-2v1',
      theme: '',
      params: {
        height: '940px',
      },
      text: {
        title: {
          label: 'COMPACT AND LIGHT DESIGN',
          style: 'style-v4',
          classes: 'mat-display-1 bold',
        },
        spacer: 'md',
        style: {
          width: '25%',
          left: '35%',
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/SY002_03.jpg?itok=mL6Xlc5B',
            mobile: '/assets/images/products/SY002-Phone_03.jpg?itok=QYgd7lty',
          },
        },
        body: '<p><span style="font-size:18px;">Mini size, lightweight and fashionable, fits perfectly in the palm of your hand, easy to carry around.</span></p>\r\n',
      },
    },
    {
      type: 'hero-2v1',
      theme: 'text-light',
      params: {
        height: '940px',
      },
      text: {
        title: {
          label: 'NEW GENERATION OF CERAMIC COIL',
          style: 'style-v4',
          classes: 'mat-display-1 bold',
        },
        spacer: 'md',
        style: {
          width: '30%',
          left: '65%',
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/SY002_04.jpg?itok=sV-MBZ3o',
            mobile: '/assets/images/products/SY002-Phone_04.jpg?itok=W1vy0LBt',
          },
        },
        body: '<p><span style="font-size:18px;">Adopts ceramic atomizing technology, with e-liquid evenly heated and fully atomized, delivering a pleasant taste and awesome throat hit, no burnt taste.</span></p>\r\n',
      },
    },
    {
      type: 'hero-2v1',
      theme: '',
      params: {
        height: '940px',
      },
      text: {
        title: {
          label: '280MAH RECHARGEABLE BATTERY',
          style: 'style-v4',
          classes: 'mat-display-1 bold',
        },
        spacer: 'md',
        style: {
          width: '30%',
          left: '35%',
          top: '40%',
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/SY002_05.jpg?itok=KjOK7nJk',
            mobile: '/assets/images/products/SY002-Phone_05.jpg?itok=A9CLEb8J',
          },
        },
        body: '<p><span style="font-size:18px;">Features 280mAh battery that can be fully charged in 1.25h, ensuring the last drop of vape juice can be run out.</span></p>\r\n',
      },
    },
    {
      type: 'hero-2v1',
      theme: 'text-light',
      params: {
        height: '940px',
      },
      text: {
        title: {
          label: 'TOP FILLING',
          style: 'style-v4',
          classes: 'mat-display-1 bold',
        },
        spacer: 'md',
        style: {
          width: '25%',
          left: '60%',
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/SY002_06.jpg?itok=mDFSnOHz',
            mobile: '/assets/images/products/SY002-Phone_06.jpg?itok=fnZwBVVU',
          },
        },
        body: '<p><span style="font-size:18px;">Oversea clients can fill the tank with e-liquid by themselves. Remove the mouthpiece, fill from the top, cover the mouthpiece after filling, unable to put it out after sealing.</span></p>\r\n',
      },
    },
    {
      type: 'hero-2v1',
      theme: '',
      params: {
        height: '940px',
      },
      text: {
        title: {
          label: 'VISIBLE TANK',
          style: 'style-v4',
          classes: 'mat-display-1 bold',
        },
        spacer: 'md',
        style: {
          width: '25%',
          left: '40%',
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/SY002_07.jpg?itok=QZeVoQvq',
            mobile: '/assets/images/products/SY002-Phone_07.jpg?itok=n0UFlVXV',
          },
        },
        body: '<p><span style="font-size:18px;">The e-liquid level can be easily noticed from the transparent window at a simple glance.</span></p>\r\n',
      },
    },
    {
      type: 'hero-2v1',
      theme: '',
      params: {
        height: '940px',
      },
      text: {
        title: {
          label: 'INTELLIGENT LED INDICATOR',
          style: 'style-v4',
          classes: 'mat-display-1 bold',
        },
        spacer: 'md',
        style: {
          width: '30%',
          left: '60%',
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/SY002_08.jpg?itok=rxH379fa',
            mobile: '/assets/images/products/SY002-Phone_08.jpg?itok=6Gs6Fh-q',
          },
        },
        body: '<p><span style="font-size:18px;">The indicator will light up when vaping and charging, adding a sense of technology.</span></p>\r\n',
      },
    },
    {
      type: 'hero-2v1',
      theme: '',
      params: {
        height: '940px',
      },
      text: {
        title: {
          label: 'MULTIPLE SAFE PROTECTION',
          style: '',
          classes: 'mat-display-1 bold',
        },
        spacer: 'md',
        style: {
          width: '50%',
          top: '25%',
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/SY002_09.jpg?itok=oC3ALp4G',
            mobile: '/assets/images/products/SY002-Phone_09.jpg?itok=CJuNKfIe',
          },
        },
        body: '',
      },
    },
    {
      type: 'hero-2v1',
      theme: '',
      params: {
        height: '940px',
      },
      text: {
        title: {
          label: 'AVAILABLE IN VARIOUS COLORS',
          style: '',
          classes: 'mat-display-1 bold',
        },
        spacer: 'md',
        style: {
          width: '50%',
          top: '19%',
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/SY002_10.jpg?itok=DS7RfoaV',
            mobile: '/assets/images/products/SY002-Phone_10.jpg?itok=r7OP9E4Q',
          },
        },
        body: '',
      },
    },
    {
      type: 'hero-2v1',
      theme: '',
      params: {
        height: '940px',
      },
      text: {
        title: {
          label: 'SPECIFICATIONS',
          style: 'style-v4',
          classes: 'mat-display-1 bold',
        },
        spacer: 'md',
        style: {
          width: '20%',
          left: '60%',
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/SY002_11.jpg?itok=zhI8p28m',
            mobile: '/assets/images/products/SY002-Phone_11.jpg?itok=mAchInFR',
          },
        },
        body: '<ul class="list-done">\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Dimension: 18.7*7.6*91.3mm</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Weight:14.7g</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Body Material: Aluminum alloy</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Battery Capacity:&nbsp;280mAh</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Output Wattage: 6-8.2W</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">E-liquid Capacity: 1.0ml</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Resistance: 1.5Ω</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Coil Material: ceramic</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Suitable for:&nbsp;THC+CBD</span></li>\r\n</ul>\r\n',
      },
    },
  ],
});
Page.args = {
  pageContent$: content,
};
