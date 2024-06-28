import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { CalculatorModule } from '@uiux/combs/calculator/calculator.module';
import { of } from 'rxjs';
import { BRANDING } from '@core/token/token-providers';
import {
  defaultHeader,
  footerInverse,
} from '@modules/builder/data/Branding.json';
import { JsoneditorComponent } from '@uiux/combs/other/jsoneditor/jsoneditor.component';
import { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import { importProvidersFrom } from '@angular/core';
const meta: Meta<JsoneditorComponent> = {
  title: '特色组件/编辑器/JSON',
  id: 'jsoneditor',
  component: JsoneditorComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
      imports: [BrandingModule, CalculatorModule],
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
    `,
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
  },
};

export default meta;
type Story = StoryObj<JsoneditorComponent>;
export const Default: Story = {};
const content: IJsoneditor = {
  type: 'jsoneditor',
  data: {
    spacer: 'none',
    type: 'hero-1v1',
    classes: 'text-light text-center',
    sliders: {
      params: {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: false,
      },
      elements: [
        {
          type: 'text',
          spacer: 'xl',
          title: {
            label: '开源',
            style: 'style-v1',
            classes: 'mat-headline-3 bold',
          },
          classes: 'xy-center',
          bg: {
            classes: 'bg-center overlay overlay-80',
            img: {
              src: '/assets/images/16-9/business-14.jpeg',
              mobile: '/assets/images/mobile/mobile-03.jpg',
            },
          },
          body: '<p style="font-size:18px">它是一个开放源代码软件，可以免费使用和修改</p>',
          actionsAlign: 'center center',
          actions: [
            {
              type: 'btn',
              mode: 'raised',
              color: 'primary',
              href: '#',
              label: '开始',
            },
          ],
        },
        {
          type: 'text',
          title: {
            label: '强大的内容管理功能',
            style: 'style-v1',
            classes: 'mat-headline-3 bold',
          },
          spacer: 'xl',
          classes: 'xy-center text-light',
          bg: {
            classes: 'bg-shadow  overlay overlay-80',
            img: {
              src: '/assets/images/16-9/business-15.jpeg',
              mobile: '/assets/images/mobile/mobile-04.jpg',
            },
          },
          body: 'Drupal 已经超越了传统的 Web概念，可以通过不同的渠道部署你的数据内容，从一个数据中心点到各个应用，从简单到复杂。',
          actionsAlign: 'center center',
          actions: [
            {
              type: 'btn',
              mode: 'raised',
              color: 'primary',
              href: '#',
              label: '开始',
            },
            {
              type: 'closeDialog',
              label: '前往',
            },
          ],
        },
      ],
    },
  },
};
Default.args = {
  content,
};
