import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';

export default {
  title: '基础组件/基本元素/按钮/基础',
  id: 'btn',
  component: BtnComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot()],
    }),
    componentWrapperDecorator((story) => {
      return `<div classs="widget">${story}</div>`;
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});

export const BtnDefault = Template.bind({});
BtnDefault.parameters = {
  controls: {
    include: ['content'],
  },
};
BtnDefault.args = {
  content: {
    type: 'btn',
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
  content: { type: 'btn', color: 'primary', label: 'Primary', mode: 'raised' },
};

export const Round = Template.bind({});

Round.args = {
  content: {
    type: 'btn',
    label: 'Round',
    color: 'primary',
    mode: 'raised',
    classes: 'round-btn',
  },
};

export const BtnLink = Template.bind({});

BtnLink.args = {
  content: {
    type: 'btn',
    href: '/node/1',
    target: '_blank',
    label: '了解更多',
    mode: 'raised',
    color: 'primary',
  },
};

export const BtnDrawer = Template.bind({});

BtnDrawer.args = {
  content: {
    type: 'btn',
    href: '/?path=/story/welcome--page',
    label: 'Drawer 预览',
    mode: 'raised',
    drawerIframe: true,
  },
};

export const BtnStroked = Template.bind({});

BtnStroked.args = {
  content: { type: 'btn', label: 'stroked', color: 'primary', mode: 'stroked' },
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
    type: 'btn',
    href: '#',
    target: '_blank',
    label: 'Stroked link',
    mode: 'stroked',
    classes: 'border-primary',
  },
};

export const BtnFlat = Template.bind({});

BtnFlat.args = {
  content: { type: 'btn', label: 'Flat', color: 'primary', mode: 'flat' },
};

export const BtnIcon = Template.bind({});

BtnIcon.args = {
  content: {
    type: 'btn',
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
    type: 'btn',
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
    type: 'btn',
    color: 'primary',
    mode: 'mini-fab',
    icon: {
      name: 'more_vert',
    },
  },
};
