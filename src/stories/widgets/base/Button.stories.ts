import { MatButtonModule } from '@angular/material/button';
import { ShareModule } from '@share/share.module';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

export default {
  title: '基础/内容/按钮',
  id: 'btn',
  component: BtnComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ShareModule, WidgetsModule, MatButtonModule],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});

export const BtnDefault = Template.bind({});

BtnDefault.args = {
  content: {
    color: 'primary',
    label: 'Primary Default',
    icon: {
      inline: true,
      name: 'delete',
    },
  },
};

export const BtnRaised = Template.bind({});

BtnRaised.args = {
  content: {
    color: 'primary',
    label: 'Primary',
    mode: 'raised',
  },
};

export const BtnLink = Template.bind({});

BtnLink.args = {
  content: {
    href: '#',
    target: '_blank',
    label: 'Primary link',
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

export const StrokedLink = Template.bind({});

StrokedLink.args = {
  content: {
    href: '#',
    target: '_blank',
    label: 'Stroked link',
    mode: 'stroked',
  },
};

export const StrokedLinkBorderPrimary = Template.bind({});

StrokedLinkBorderPrimary.args = {
  content: {
    href: '#',
    target: '_blank',
    label: 'Stroked link',
    mode: 'stroked',
    classes: 'border-primary',
  },
};

export const BtnFlat = Template.bind({});

BtnFlat.args = {
  content: {
    label: 'Flat',
    color: 'primary',
    mode: 'flat',
  },
};

export const BtnIcon = Template.bind({});

BtnIcon.args = {
  content: {
    color: 'primary',
    mode: 'icon',
    icon: {
      name: 'more_vert',
    },
  },
};

export const BtnFab = Template.bind({});

BtnFab.args = {
  content: {
    color: 'primary',
    mode: 'fab',
    icon: {
      name: 'more_vert',
    },
  },
};

export const BtnMiniFab = Template.bind({});

BtnMiniFab.args = {
  content: {
    color: 'primary',
    mode: 'mini-fab',
    icon: {
      name: 'more_vert',
    },
  },
};
