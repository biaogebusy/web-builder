import { IBtn } from '@core/interface/widgets/IBtn';
import { StorysModule } from '@core/module/storys.module';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';

export default {
  title: '基本元素/按钮/基础',
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
BtnDefault.storyName = '默认';
const content: IBtn = {
  type: 'btn',
  color: 'primary',
  label: 'Primary Default',
  icon: {
    inline: true,
    name: 'delete',
  },
};
BtnDefault.args = {
  content,
};

export const BtnRaised = Template.bind({});
const raised: IBtn = {
  type: 'btn',
  color: 'primary',
  label: 'Primary',
  mode: 'raised',
};
BtnRaised.args = {
  content: raised,
};

export const BtnDisabled = Template.bind({});
const disabled: IBtn = {
  type: 'btn',
  color: 'primary',
  label: 'Disabled',
  mode: 'raised',
  disabled: true,
};
BtnDisabled.args = {
  content: disabled,
};

export const Round = Template.bind({});
const round: IBtn = {
  type: 'btn',
  label: 'Round',
  color: 'primary',
  mode: 'raised',
  classes: 'round-btn',
};

Round.args = {
  content: round,
};

export const BtnLink = Template.bind({});
const btnLink: IBtn = {
  type: 'btn',
  href: '/node/1',
  target: '_blank',
  label: '了解更多',
  mode: 'raised',
  color: 'primary',
};
BtnLink.args = {
  content: btnLink,
};

export const BtnDrawer = Template.bind({});
const drawer: IBtn = {
  type: 'btn',
  href: '/?path=/story/welcome--page',
  label: 'Drawer 预览',
  mode: 'raised',
  drawerIframe: true,
};
BtnDrawer.args = {
  content: drawer,
};

export const BtnStroked = Template.bind({});
const stroked: IBtn = {
  type: 'btn',
  label: 'stroked',
  color: 'primary',
  mode: 'stroked',
};
BtnStroked.args = {
  content: stroked,
};

export const StrokedLink = Template.bind({});
const strokedLink: IBtn = {
  href: '#',
  target: '_blank',
  label: 'Stroked link',
  mode: 'stroked',
};

StrokedLink.args = {
  content: strokedLink,
};

export const StrokedLinkBorderPrimary = Template.bind({});
const slbp: IBtn = {
  type: 'btn',
  href: '#',
  target: '_blank',
  label: 'Stroked link',
  mode: 'stroked',
  classes: 'border-primary',
};
StrokedLinkBorderPrimary.args = {
  content: slbp,
};

export const BtnFlat = Template.bind({});
const flat: IBtn = {
  type: 'btn',
  label: 'Flat',
  color: 'primary',
  mode: 'flat',
};
BtnFlat.args = {
  content: flat,
};

export const BtnIcon = Template.bind({});
const icon: IBtn = {
  type: 'btn',
  color: 'primary',
  mode: 'icon',
  icon: {
    name: 'more_vert',
  },
};
BtnIcon.args = {
  content: icon,
};

export const BtnFab = Template.bind({});
const fab: IBtn = {
  type: 'btn',
  color: 'primary',
  mode: 'fab',
  icon: {
    name: 'more_vert',
  },
};
BtnFab.args = {
  content: fab,
};

export const BtnMiniFab = Template.bind({});
const mini: IBtn = {
  type: 'btn',
  color: 'primary',
  mode: 'mini-fab',
  icon: {
    name: 'more_vert',
  },
};
BtnMiniFab.args = {
  content: mini,
};
