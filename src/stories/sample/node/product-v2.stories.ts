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
import { defaultHeader, footerInverse } from '../../global/Branding.json';
import { BRANDING } from '@core/token/token-providers';

export default {
  title: '示例页面/产品介绍/02 滚动播放动画',
  id: 'product-v2',
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
            ...defaultHeader,
            ...footerInverse,
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
  title: 'TS97 | Kingzone',
  body: [
    {
      type: 'hero-2v1',
      theme: '',
      params: {
        height: '940px',
      },
      text: {
        title: {
          label: 'SIDE-FILLING SYSTEM ',
          style: 'style-v1',
          classes: 'mat-display-1 bold',
        },
        spacer: 'md',
        style: {
          width: '50%',
          top: '25%',
        },
        animate: {
          scrub: true,
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/TS97-Computer_02.jpg?itok=GT_7nTVu',
            mobile: '/assets/images/products/TS97-Phone_02.jpg?itok=ImaC2qOS',
          },
        },
        body: '<p class="text-align-center"><span style="font-size:18px;">Supports filling by overseas clients as a considerable advantage.</span></p>\r\n\r\n<p class="text-align-center"><span style="font-size:18px;">They can choose their preferred THC/CBD e-liquid.</span></p>\r\n',
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
          label: 'VISIBLE CAPACITY',
          style: 'style-v4',
          classes: 'mat-display-1 bold',
        },
        spacer: 'md',
        style: {
          width: '25%',
          left: '40%',
        },
        animate: {
          scrub: true,
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/TS97-Computer_03.jpg?itok=uiyThNVK',
            mobile: '/assets/images/products/TS97-Phone_03.jpg?itok=XS5CqfWR',
          },
        },
        body: '<p><span style="font-size:18px;">The Translucent pod enables you to easily monitor the level of THC oil.</span></p>\r\n',
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
          label: 'NEW GENERATION OF CERAMIC COIL',
          style: 'style-v4',
          classes: 'mat-display-1 bold',
        },
        animate: {
          scrub: true,
        },
        spacer: 'md',
        style: {
          width: '25%',
          left: '65%',
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/TS97-Computer_04.jpg?itok=AvWq4dyf',
            mobile: '/assets/images/products/TS97-Phone_04.jpg?itok=lSSt0YdT',
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
          label: 'LONG-LASTING BATTERY LIFE',
          style: 'style-v4',
          classes: 'mat-display-1 bold',
        },
        animate: {
          scrub: true,
        },
        spacer: 'md',
        style: {
          width: '30%',
          left: '40%',
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/TS97-Computer_05.jpg?itok=7S6tbHw2',
            mobile: '/assets/images/products/TS97-Phone_05.jpg?itok=EDMgFvOc',
          },
        },
        body: '<p style="text-align:justify"><span style="font-size:18px;">280mAh battery with micro-USB charging, ensures the last drop of THC oil can be used up.</span></p>\r\n',
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
          label: 'STEALTH IN YOUR HAND',
          style: 'style-v4',
          classes: 'mat-display-1 bold',
        },
        animate: {
          scrub: true,
        },
        spacer: 'md',
        style: {
          width: '20%',
          left: '35%',
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/TS97-Computer_06.jpg?itok=UQQ3vIo9',
            mobile: '/assets/images/products/TS97-Phone_06.jpg?itok=xFpLNgIS',
          },
        },
        body: '<p><span style="font-size:18px;">Its exterior resembles a flash drive&nbsp;for portability, fits nicely into your pocket and feels weightless.</span></p>\r\n',
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
          label: 'PREMIUM MATERIAL',
          style: 'style-v4',
          classes: 'mat-display-1 bold',
        },
        animate: {
          scrub: true,
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
            src: '/assets/images/products/TS97-Computer_07.jpg?itok=hOhTCHVy',
            mobile: '/assets/images/products/TS97-Phone_07.jpg?itok=uUwAcK-I',
          },
        },
        body: '<p><span style="font-size:18px;">All-aluminum alloy&nbsp;outer chassis for durability, with the food-grade pod,&nbsp;providing safety and reliability.</span></p>\r\n',
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
          label: 'INTELLIGENT LED LIGHT',
          style: 'style-v4',
          classes: 'mat-display-1 bold',
        },
        animate: {
          scrub: true,
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
            src: '/assets/images/products/TS97-Computer_08.jpg?itok=LdOsboTY',
            mobile: '/assets/images/products/TS97-Phone_08.jpg?itok=VZueJbig',
          },
        },
        body: '<p style="text-align:justify"><span style="font-size:18px;">Features a single LED light in its end to tell the working status of the vape device.</span></p>\r\n',
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
          label: 'FIVE SAFE PROTECTIONS',
          style: '',
          classes: 'mat-display-1 bold',
        },
        animate: {
          scrub: true,
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
            src: '/assets/images/products/TS97-Computer_09.jpg?itok=moc7rF3x',
            mobile: '/assets/images/products/TS97-Phone_09.jpg?itok=pTGzU87s',
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
        animate: {
          scrub: true,
        },
        spacer: 'md',
        style: {
          width: '50%',
          top: '20%',
        },
        classes: 'xy-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/TS97-Computer_10.jpg?itok=2ayKlLIU',
            mobile: '/assets/images/products/TS97-Phone_10.jpg?itok=CUpDqQ6-',
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
        animate: {
          scrub: true,
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
            src: '/assets/images/products/TS97-Computer_11.jpg?itok=0pmUT9ap',
            mobile: '/assets/images/products/TS97-Phone_11.jpg?itok=5gSzrC0W',
          },
        },
        body: '<ul class="list-done">\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Dimension: 18.8*7.6*86.5mm</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Weight:12g</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Battery capacity: 280mAh</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Output voltage:&nbsp;3.5V</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Input voltage:&nbsp;3.3-4.2V</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Input current:&nbsp;3A</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Charging Current: 5V/250mA(Micro-USB)</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Charging time :&nbsp;1.25h</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Pod capacity: 1.0ml</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Resistance: 1.4Ω</span></li>\r\n\t<li style="text-align: justify;"><span style="font-size:18px;">Coil material: ceramic</span></li>\r\n</ul>\r\n',
      },
    },
    {
      type: 'hero-2v1',
      theme: '',
      params: {
        height: '940px',
      },
      text: {
        spacer: 'md',
        style: {
          width: '50%',
        },
        animate: {
          scrub: true,
        },
        classes: 'y-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/TS97-Computer_12.jpg?itok=IIGpi5mM',
            mobile: '/assets/images/products/TS97-Phone_12.jpg?itok=Gq4DIgEQ',
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
        spacer: 'none',
        style: {
          width: '50%',
        },
        animate: {
          scrub: true,
        },
        classes: 'y-center',
        bg: {
          classes: 'bg-shadow bg-fill-width',
          img: {
            src: '/assets/images/products/TS97-Computer_13.jpg?itok=8rhn3zeA',
            mobile: '/assets/images/products/TS97-Phone_13.jpg?itok=HNHY70Wb',
          },
        },
        body: '',
      },
    },
  ],
});
Page.args = {
  pageContent$: content,
};
