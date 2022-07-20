import { MatButtonModule } from '@angular/material/button';
import { ShareModule } from '../../app/share/share.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BtnComponent } from '../../app/uiux/widgets/btn/btn.component';
import { WidgetsModule } from '../../app/uiux/widgets/widgets.module';

export default {
  title: 'Widgets/Button',
  component: BtnComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [WidgetsModule],
    }),
  ],
} as Meta;

const Template: Story<BtnComponent> = (args) => ({
  component: BtnComponent,
  props: {
    ...args,
  },
});
export const BtnRaised = Template.bind({});

BtnRaised.args = {
  content: {
    color: 'primary',
    label: 'primary',
    mode: 'raised',
  },
};

export const BtnLink = Template.bind({});

BtnLink.args = {
  content: {
    href: '#',
    target: '_blank',
    label: 'primary',
    mode: 'raised',
  },
};

export const BtnStroked = Template.bind({});

BtnStroked.args = {
  content: {
    label: 'stroked',
    color: 'primary',
    mode: 'stroked',
  },
};
