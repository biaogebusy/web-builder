import { storiesOf, moduleMetadata, Story } from '@storybook/angular';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { ShareModule } from '@share/share.module';
import { CORE_CONFIG } from '@core/token/core.config';

storiesOf('Img', module)
  .addDecorator(
    moduleMetadata({
      imports: [ShareModule],
      declarations: [],
      providers: [
        {
          provide: CORE_CONFIG,
          useValue: {},
        },
      ],
    })
  )
  .add('Img', () => ({
    component: ImgComponent,
    argTypes: {
      content: {
        hostClasses: 'bg-center',
        src: '/assets/images/banner-01.jpeg',
        alt: 'page title',
      },
    },
    props: {
      content: {
        hostClasses: 'bg-center',
        src: '/assets/images/banner-01.jpeg',
        alt: 'page title',
      },
    },
  }));
