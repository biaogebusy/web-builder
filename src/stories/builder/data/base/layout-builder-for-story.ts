import {
  FourCol,
  LayoutDefault,
  ThreeCol,
  TwoCol,
} from '@stories/builder/LayoutBuilder.stories';
import { Default as CustomTeplate } from '@stories/builder/CustomTemplate.stories';

export const layoutBuilder: any[] = [
  {
    label: '默认',
    icon: {
      svg: 'view-week-outline',
    },
    content: LayoutDefault.args?.content,
  },
  {
    label: '两栏',
    icon: {
      svg: 'image-text',
    },
    content: TwoCol.args?.content,
  },
  {
    label: '三栏',
    icon: {
      svg: 'view-week-outline',
    },
    content: ThreeCol.args?.content,
  },
  {
    label: '四栏',
    icon: {
      svg: 'land-rows-vertical',
    },
    content: FourCol.args?.content,
  },
  {
    label: '空白',
    icon: {
      svg: 'border-none-variant',
    },
    content: {
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
      direction: 'row',
      wrap: 'wrap',
      horizontal: 'center',
      vertical: 'center',
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
      type: 'layout-builder',
      elements: [
        {
          row: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
          direction: 'row',
          wrap: 'wrap',
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
          layoutAlign: 'start start',
          elements: [],
        },
        {
          row: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 6,
          },
          direction: 'row',
          wrap: 'wrap',
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
          layoutAlign: 'start start',
          elements: [],
        },
      ],
    },
  },
  {
    label: '自定义',
    icon: {
      svg: 'code-json',
    },
    content: CustomTeplate.args?.content,
  },
];
