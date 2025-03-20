import { IBtn } from '@core/interface/widgets/IBtn';
import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { importProvidersFrom } from '@angular/core';
import { StorysModule } from '@core/module/storys.module';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';

const meta: Meta<BtnComponent> = {
  title: '基本元素/按钮/基础',
  id: 'btn',
  component: BtnComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [SafeHtmlPipe],
      imports: [],
    }),
  ],
};

export default meta;
type Story = StoryObj<BtnComponent>;

export const BtnDefault: Story = {};
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

const raised: IBtn = {
  type: 'btn',
  color: 'primary',
  label: 'Primary',
  mode: 'raised',
};
export const BtnRaised: Story = {};
BtnRaised.args = {
  content: raised,
};

const disabled: IBtn = {
  type: 'btn',
  color: 'primary',
  label: 'Disabled',
  mode: 'raised',
  disabled: true,
};
export const BtnDisabled: Story = {};
BtnDisabled.args = {
  content: disabled,
};

const round: IBtn = {
  type: 'btn',
  label: 'Round',
  color: 'primary',
  mode: 'raised',
  pill: true,
};
export const Pill: Story = {};
Pill.args = {
  content: round,
};

const btnLink: IBtn = {
  type: 'btn',
  href: '/node/1',
  target: '_blank',
  label: '了解更多',
  mode: 'raised',
  color: 'primary',
};
export const BtnLink: Story = {};
BtnLink.args = {
  content: btnLink,
};

const drawer: IBtn = {
  type: 'btn',
  href: '/?path=/story/welcome--page',
  label: 'Drawer 预览',
  mode: 'raised',
  drawerIframe: true,
};
export const BtnDrawer: Story = {};
BtnDrawer.args = {
  content: drawer,
};

const stroked: IBtn = {
  type: 'btn',
  label: 'stroked',
  color: 'primary',
  mode: 'stroked',
};
export const BtnStroked: Story = {};
BtnStroked.args = {
  content: stroked,
};

const strokedLink: IBtn = {
  href: '#',
  target: '_blank',
  label: 'Stroked link',
  mode: 'stroked',
};
export const StrokedLink: Story = {};
StrokedLink.args = {
  content: strokedLink,
};

const slbp: IBtn = {
  type: 'btn',
  href: '#',
  target: '_blank',
  label: 'Stroked link',
  mode: 'stroked',
  classes: 'border-primary',
};
export const StrokedLinkBorderPrimary: Story = {};
StrokedLinkBorderPrimary.args = {
  content: slbp,
};

const flat: IBtn = {
  type: 'btn',
  label: 'Flat',
  color: 'primary',
  mode: 'flat',
};
export const BtnFlat: Story = {};
BtnFlat.args = {
  content: flat,
};

const icon: IBtn = {
  type: 'btn',
  color: 'primary',
  mode: 'icon',
  icon: {
    name: 'more_vert',
  },
};
export const BtnIcon: Story = {};
BtnIcon.args = {
  content: icon,
};

const fab: IBtn = {
  type: 'btn',
  color: 'primary',
  mode: 'fab',
  icon: {
    name: 'more_vert',
  },
};
export const BtnFab: Story = {};
BtnFab.args = {
  content: fab,
};

const mini: IBtn = {
  type: 'btn',
  color: 'primary',
  mode: 'mini-fab',
  icon: {
    name: 'more_vert',
  },
};
export const BtnMiniFab: Story = {};
BtnMiniFab.args = {
  content: mini,
};
