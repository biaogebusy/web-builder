import { moduleMetadata, Meta } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { RenderModule } from '@modules/render/render.module';
import { StorysModule } from '@core/module/storys.module';
import { BuilderModule } from 'src/app/modules/builder/builder.module';
import { IS_BUILDER_MODE } from '@core/token/token-providers';
import { of } from 'rxjs';
import { CustomTemplateComponent } from '@modules/builder/custom-template/custom-template.component';
export default {
  title: '低代码/Layout builder/自定义模板',
  id: 'custom-template',
  component: CustomTemplateComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [BuilderModule, RenderModule, StorysModule.forRoot()],
      providers: [
        {
          provide: IS_BUILDER_MODE,
          useValue: of(false),
        },
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});
export const Default = Template.bind({});
Default.storyName = '默认';
Default.args = {
  content: {
    type: 'custom-template',
    data: {
      title: 'web builder',
      subTitle: '是一款通过拖拽组件构建页面的低代码',
      content:
        '信使UI是一款开源的前端框架，基于Angular Material UI，支持SSR，多应用，后端可根据实际情况自由配置，可自定义开发、新增组件库。',
    },
    html: `<div class="text-center md:text-left md:flex bg-shadow rounded-xl p-8 md:p-0 m-5 mx-auto overflow-hidden">
          <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/assets/images/avatar/05.jpeg" alt="" width="384" height="512">
          <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
             <p class="text-lg font-medium">
                “{{content}}”
              </p>
            <div class="font-medium">
              <div class="text-primary text-xl">
                {{title}}
              </div>
              <div class="opacity-75">
                {{subTitle}}
              </div>
            </div>
          </div>
        </div>`,
  },
};
