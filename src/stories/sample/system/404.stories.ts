import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { ILayoutBuilder } from '@core/interface/IBuilder';
import { BuilderModule } from '@modules/builder/builder.module';
import { LayoutBuilderComponent } from '@modules/builder/layout-builder/layout-builder.component';

const meta: Meta<LayoutBuilderComponent> = {
  title: '示例页面/系统页面/404',
  id: 'notFound',
  component: LayoutBuilderComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      entryComponents: [...StorysModule.forEntryComponents()],
      imports: [StorysModule.forRoot(), BrandingModule, BuilderModule],
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
        component: `当用户访问的页面不存在时，显示404页面。`,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<LayoutBuilderComponent>;
export const Default: Story = {};
const content: ILayoutBuilder = {
  fullWidth: false,
  spacer: 'md',
  bgClasses: 'bg-fill-width',
  overlay: '',
  classes: '',
  id: '',
  bg: {
    img: {
      src: '',
      classes: 'object-fit',
      alt: '',
    },
    classes: 'bg-fill-width',
    overlay: '',
  },
  horizontal: 'center',
  vertical: 'center',
  gap: {},
  wrapperClass: '',
  animate: {
    from: {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      skewY: 0,
      opacity: 1,
      delay: 0,
      duration: 1,
      ease: 'none',
      rotation: 0,
      scale: 1,
    },
    trigger: {
      onEnter: 'play',
      onLeave: 'none',
      onEnterBack: 'none',
      onLeaveBack: 'none',
      start: 'top 90%',
      end: 'top 40%',
      scrub: false,
    },
  },
  type: 'layout-builder',
  elements: [
    {
      row: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      horizontal: 'start',
      vertical: 'stretch',
      gap: {
        xs: '4',
        sm: '4',
        md: '4',
        lg: '4',
      },
      bg: {
        img: {
          src: '',
          alt: '',
          classes: 'object-fit',
        },
        overlay: '',
        classes: 'bg-fill-width',
      },
      classes: '',
      blockClasses: '',
      animate: {
        from: {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scaleX: 1,
          scaleY: 1,
          skewX: 0,
          skewY: 0,
          opacity: 1,
          delay: 0,
          duration: 1,
          ease: 'none',
          rotation: 0,
          scale: 1,
        },
        trigger: {
          onEnter: 'play',
          onLeave: 'none',
          onEnterBack: 'none',
          onLeaveBack: 'none',
          start: 'top 90%',
          end: 'top 40%',
          scrub: false,
        },
      },
      style: {
        borderRadius: 'none',
      },
      elements: [
        {
          type: 'img',
          hostClasses: 'text-center',
          classes: '',
          style: {
            width: '800px',
            maxWidth: '100%',
          },
          src: '/assets/images/404.svg',
          alt: 'alt',
        },
      ],
    },
    {
      row: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
      horizontal: 'start',
      vertical: 'stretch',
      gap: {
        xs: '4',
        sm: '4',
        md: '4',
        lg: '4',
      },
      bg: {
        img: {
          src: '',
          alt: '',
          classes: 'object-fit',
        },
        overlay: '',
        classes: 'bg-fill-width',
      },
      classes: '',
      style: {
        borderRadius: 'none',
      },
      animate: {
        from: {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          delay: 0,
          duration: 1,
          ease: 'none',
        },
        trigger: {
          onEnter: 'play',
          onLeave: 'none',
          onEnterBack: 'none',
          onLeaveBack: 'none',
          start: 'top 90%',
          end: 'top 40%',
        },
      },
      elements: [
        {
          style: 'style-v1',
          classes: 'mat-display-1 bold',
          typed: {
            enable: false,
            config: {
              typeSpeed: 120,
            },
            strings: [
              {
                label: 'web builder',
              },
            ],
          },
          animate: {
            from: {
              x: 0,
              y: 0,
              rotationX: 0,
              rotationY: 0,
              scaleX: 1,
              scaleY: 1,
              skewX: 0,
              skewY: 0,
              opacity: 1,
              delay: 0,
              duration: 1,
              ease: 'none',
            },
            trigger: {
              onEnter: 'play',
              onLeave: 'none',
              onEnterBack: 'none',
              onLeaveBack: 'none',
              start: 'top 90%',
              end: 'top 40%',
              scrub: false,
            },
          },
          type: 'title',
          label:
            '<p style="display: inline-block; margin-bottom: 0px;">OH!NO&nbsp;</p><div><p style="display: inline-block; margin-bottom: 0px;">页面没有找到</p></div>',
        },
      ],
    },
    {
      row: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      },
      horizontal: 'center',
      vertical: 'center',
      gap: {
        xs: '4',
        sm: '4',
        md: '4',
        lg: '4',
      },
      bg: {
        img: {
          src: '',
          alt: '',
          classes: 'object-fit',
        },
        overlay: '',
        classes: 'bg-fill-width',
      },
      classes: '',
      blockClasses: '',
      animate: {
        from: {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scaleX: 1,
          scaleY: 1,
          skewX: 0,
          skewY: 0,
          opacity: 1,
          delay: 0,
          duration: 1,
          ease: 'none',
          rotation: 0,
          scale: 1,
        },
        trigger: {
          onEnter: 'play',
          onLeave: 'none',
          onEnterBack: 'none',
          onLeaveBack: 'none',
          start: 'top 90%',
          end: 'top 40%',
          scrub: false,
        },
      },
      style: {
        borderRadius: 'none',
      },
      elements: [
        {
          type: 'text',
          spacer: 'none',
          body: '很抱歉，您请求的页面可能已经被移除、更改名称或暂时无法使用。在查找更多信息之前，您可以尝试以下操作：<ul class="list-done"><li>检查您输入的URL是否正确</li><li>在浏览器中清除缓存和Cookie</li><li>尝试在不同的浏览器或设备上打开页面</li></ul><p>我们非常感谢您对我们的关注和理解，我们会尽快解决问题并让我们的页面再次正常工作。</p>',
        },
        {
          color: 'primary',
          label: '了解更多',
          mode: 'raised',
          href: '/home',
          target: '_blank',
          icon: {
            svg: '',
          },
          classes: '',
          pill: false,
          animate: {
            from: {
              x: 0,
              y: 0,
              rotationX: 0,
              rotationY: 0,
              scaleX: 1,
              scaleY: 1,
              skewX: 0,
              skewY: 0,
              opacity: 1,
              delay: 0,
              duration: 1,
              ease: 'none',
            },
            trigger: {
              onEnter: 'play',
              onLeave: 'none',
              onEnterBack: 'none',
              onLeaveBack: 'none',
              start: 'top 90%',
              end: 'top 40%',
              scrub: false,
            },
          },
          type: 'btn',
        },
      ],
    },
  ],
};
Default.args = {
  content,
};
