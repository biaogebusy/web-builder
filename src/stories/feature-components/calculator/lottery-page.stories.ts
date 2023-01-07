import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { screen, userEvent } from '@storybook/testing-library';
import { BlockComponent } from '@uiux/combs/block/block/block.component';
import { BlockModule } from '@uiux/combs/block/block.module';
import { sleep, StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { LotteryComponent } from '@uiux/combs/calculator/lottery/lottery.component';
import { CalculatorModule } from '@uiux/combs/calculator/calculator.module';

export default {
  title: '特色组件/计算器',
  id: 'lottery-page',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [
        BlockModule,
        StorysModule.forRoot(),
        BrandingModule,
        CalculatorModule,
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
export const Page = Template.bind({});
// Raname Story
Page.storyName = '预算';
Page.play = async () => {
  await sleep(3000);
  const MaxTotal: any = document.getElementById('maxTotal');
  await userEvent.type(MaxTotal, '300', {
    delay: 200,
  });

  await sleep(1000);
  const MaxPer: any = document.getElementById('maxPer');
  await userEvent.type(MaxPer, '10', {
    delay: 200,
  });

  await sleep(1000);
  const MinTotal: any = document.getElementById('minTotal');
  await userEvent.type(MinTotal, '500', {
    delay: 200,
  });

  await sleep(1000);
  const MinPer: any = document.getElementById('minPer');
  await userEvent.type(MinPer, '3', {
    delay: 200,
  });

  const Form = document.getElementsByTagName('app-formly')[0];
  await userEvent.click(Form);

  await sleep(2000);
  await userEvent.clear(MinPer);

  await sleep(1000);
  await userEvent.type(MinPer, '0.8', {
    delay: 200,
  });

  await sleep(2000);
  const Way = screen.getByRole('switch');
  await userEvent.click(Way);
};
