import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Action1v1Component } from '../../../app/uiux/combs/action/action1v1/action1v1.component';
import { Story } from '@storybook/angular/types-6-0';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { CORE_CONFIG } from '@core/token/core.config';
import { CombsModule } from '../../../app/uiux/combs/combs.module';
import { HttpClientModule } from '@angular/common/http';
import { apiUrlFactory, API_URL } from '@core/token/token-providers';
import { NgxWebstorageModule } from 'ngx-webstorage';
export default {
  title: 'Components/Action/Action 1v1',
  component: Action1v1Component,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CombsModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [
        SafeHtmlPipe,
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
        {
          provide: API_URL,
          useFactory: apiUrlFactory,
          deps: [],
        },
      ],
    }),
  ],
} as Meta;

const Template: Story<Action1v1Component> = (args) => ({
  component: Action1v1Component,
  props: {
    ...args,
  },
});
export const Default = Template.bind({});

Default.args = {
  content: {
    id: 'xxx',
    spacer: 'xl',
    bg: {
      classes: 'bg-shadow',
    },
    text: {
      title: {
        label: '如何才能帮助到您？',
        style: 'none',
        classes: 'mat-display-1',
      },
      spacer: 'none',
      body: '<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>',
      actions: [
        {
          type: 'search-action',
          button: {
            label: '搜索',
            color: 'primary',
          },
          form: [
            {
              type: 'select',
              key: 'skill',
              label: '技能',
              options: [
                {
                  label: '无',
                  value: '',
                },
                {
                  label: 'Angular',
                  value: '170',
                },
                {
                  label: 'React',
                  value: '162',
                },
                {
                  label: 'Vue',
                  value: '167',
                },
              ],
            },
            {
              type: 'select',
              key: 'cms',
              label: 'CMS',
              options: [
                {
                  label: '无',
                  value: '',
                },
                {
                  label: 'Drupal',
                  value: '170',
                },
                {
                  label: 'WP',
                  value: '162',
                },
                {
                  label: 'Joomla',
                  value: '167',
                },
              ],
            },
            {
              type: 'input',
              key: 'keys',
              placeholder: '请输入关键词搜索',
              controlType: 'search',
              label: '关键词',
              appearance: 'legacy',
            },
          ],
        },
      ],
    },
    shape: true,
  },
};
