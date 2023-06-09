import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockModule } from '@uiux/combs/block/block.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { of } from 'rxjs';
import { BRANDING } from '@core/token/token-providers';
import { BuilderComponent } from 'src/app/modules/builder/builder.component';
import { defaultHeader, footerInverse } from './global/Branding.json';
import { BuilderModule } from 'src/app/modules/builder/builder.module';
export default {
  title: 'Builder',
  id: 'builder',
  component: BuilderComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [
        BlockModule,
        StorysModule.forRoot(),
        BrandingModule,
        BuilderModule,
      ],
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
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.args = {
  content: {},
};
