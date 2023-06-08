import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { BlockComponent } from '@uiux/combs/block/block/block.component';
import { BlockModule } from '@uiux/combs/block/block.module';
import { StorysModule } from '@core/module/storys.module';
import { BrandingModule } from '@core/branding/branding.module';
import { BRANDING } from '@core/token/token-providers';
import { of } from 'rxjs';
import { canvasHeader, medicalInverse } from '../../global/Branding.json';

export default {
  title: '示例页面/首页示例/06 医疗科技',
  id: 'home-v6',
  component: BlockComponent,
  decorators: [
    moduleMetadata({
      entryComponents: [...StorysModule.forEntryComponents()],
      declarations: [],
      imports: [StorysModule.forRoot(), BlockModule, BrandingModule],
      providers: [
        {
          provide: BRANDING,
          useValue: of({
            ...canvasHeader,
            ...medicalInverse,
          }),
        },
      ],
    }),
    componentWrapperDecorator(
      (story) => `
      <app-header></app-header>
      <div style="overflow:hidden">
      ${story}
      </div>
      <app-footer></app-footer>
    `
    ),
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
export const Page = Template.bind({});
// Raname Story
const content = of({
  title: '首页 v6 医疗科技',
  configBak: {
    headerMode: {
      transparent: true,
      style: 'light',
    },
  },
  meta: [
    {
      name: 'description',
      content: '',
    },
    {
      name: 'keywords',
      content: '',
    },
  ],
  body: [
    {
      type: 'hero-1v3',
      spacer: 'xl',
      text: {
        title: {
          label: 'Hope Changes Lives',
          classes: 'mat-display-4 bold',
          style: 'style-v4',
        },
        classes: 'p-x text-light',
        body: 'We’re in relentless pursuit of scientific breakthroughs and revolutionary medicines that will create a healthier world for everyone. ',
        actions: [
          {
            type: 'btn',
            mode: 'raised',
            color: 'primary',
            href: '#',
            label: 'Explore Our Science',
            target: '_blank',
          },
          {
            type: 'btn-video',
            color: 'primary',
            video: {
              options: {
                controls: true,
                aspectRatio: '16:9',
                poster: '/assets/images/16-9/business-02.jpg',
                sources: [
                  {
                    src: '/assets/video/afterglow.mp4',
                    type: 'video/mp4',
                  },
                ],
              },
            },
          },
        ],
      },
      right: [
        {
          type: 'img',
          hostClasses: 'img-bg-shape',
          src: '/assets/images/hero/hero-component.svg',
        },
      ],
      bg: {
        classes: 'bg-fill-width bg-primary bg-center',
        img: {
          src: '/assets/images/bg/bg-hero.svg',
          mobile: '/assets/images/bg/bg-hero.svg',
        },
      },
    },
    {
      id: '',
      type: 'showcase-3v9',
      spacer: 'xl',
      bg: {
        classes: 'bg-fill-width',
        img: {
          src: '/assets/images/bg/bg-01.png',
        },
      },
      order: {
        left: 0,
        right: 1,
      },
      left: [
        {
          type: 'img',
          src: '/assets/images/medical/showcase-01.jpg',
          alt: '',
        },
      ],
      right: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: '2023 Annual Meeting of Shareholders',
            style: 'style-v4',
            classes: 'mat-display-2',
          },
          body: 'Annual Shareholder Meeting',
          actions: [
            {
              type: 'btn-animate',
              label: 'Click here to join the meeting',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
          ],
        },
      ],
    },
    {
      id: '',
      type: 'showcase-3v9',
      spacer: 'xl',
      bg: {
        classes: 'bg-fill-width',
        img: {
          src: '/assets/images/bg/bg-01.png',
        },
      },
      order: {
        left: 1,
        right: 0,
      },
      left: [
        {
          type: 'img',
          src: '/assets/images/medical/showcase-02.jpg',
          alt: '',
        },
      ],
      right: [
        {
          type: 'text',
          spacer: 'sm',
          title: {
            label: 'Working to Meet ESG Commitments',
            style: 'style-v4',
            classes: 'mat-display-2',
          },
          body: 'Pfizer prioritizes the health and well-being of people and the planet to deliver breakthroughs around the world in a responsible way. Pfizer’s commitment to ESG spans product innovation; equitable access and pricing; product quality and safety; diversity, equity, and inclusion; climate change; and business ethics.',
          actions: [
            {
              type: 'btn-animate',
              label: 'Read the 2022 ESG Report',
              href: '#',
              style: 'style-v1',
              icon: 'open_in_new',
            },
          ],
        },
      ],
    },
    {
      type: 'showcase-2v1',
      row: '4',
      text: {
        title: {
          label: 'Latest Articles',
          style: 'style-v1',
          classes: 'mat-display-0 bold',
        },
      },
      bg: {
        classes: 'bg-fill-width bg-shadow',
      },
      elements: [
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label:
              'Cancer Biomarkers: Paving the Way for Better Lung Cancer Treatment',
          },
          user: 'Science & Innovation',
          time: '2022/09/27',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/medical/showcase-03.jpg',
              alt: 'alt',
            },
          },
          moreLabel: 'Learn More',
        },
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label:
              'Maternal Immunization: Protecting Children from RSV and GBS',
          },
          user: 'Science & Innovation',
          time: '2022/09/27',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/medical/showcase-04.jpg',
              alt: 'alt',
            },
          },
          moreLabel: 'Learn More',
        },
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label:
              'Pfizer’s Biopharma Global Chief Marketing Officer Drew Panayiotou is ‘Radically Obsessed’ with Listening to Patients',
          },
          user: 'Real People',
          time: '2022/09/27',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/medical/showcase-05.jpg',
              alt: 'alt',
            },
          },
          moreLabel: 'Learn More',
        },
        {
          type: 'card-1v1',
          link: {
            href: '#',
            label:
              "'I Choose to Be Positive': A Metastatic Melanoma Story Guided by Hope",
          },
          user: 'Real People',
          time: '2022/09/27',
          feature: {
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-4-3',
            img: {
              classes: 'object-fit',
              src: '/assets/images/medical/showcase-06.jpg',
              alt: 'alt',
            },
          },
          moreLabel: 'Learn More',
        },
      ],
    },
    {
      type: 'carousel-1v2',
      title: {
        label: 'Gallery',
        style: 'style-v6 line-full-width',
      },
      bg: {
        classes: 'bg-white bg-fill-width',
      },
      sliders: {
        params: {
          slidesPerView: 1.2,
          spaceBetween: 10,
          navigation: false,
          pagination: false,
          breakpoints: {
            '600': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            '960': {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          },
        },
        classes: 'p-bottom',
        elements: [
          {
            type: 'card',
            classes: 'card-no-shadow',
            link: {
              href: '#',
              label: 'A Two-Pronged Approach to Addressing COVID-19',
            },
            body: 'Explore how vaccinations and treatment with authorized oral medication for those eligible are working to combat COVID-19.',
            moreLabel: 'Learn More',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/medical/card-01.jpg',
                alt: 'alt',
              },
            },
          },
          {
            type: 'card',
            link: {
              href: '#',
              label: 'Our Vaccine Efforts',
            },
            classes: 'card-no-shadow',
            body: 'Follow the latest progress in the development, manufacturing, and distribution of our vaccine to help protect against the novel coronavirus.',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/medical/card-02.jpg',
                alt: 'alt',
              },
            },
          },
          {
            type: 'card',
            link: {
              href: '#',
              label: 'Our Treatment Efforts',
            },
            classes: 'card-no-shadow',
            body: 'Orally administered treatments for COVID-19 are designed to be prescribed at the first sign of infection, potentially helping patients avoid severe illness, which can lead to hospitalization and death.',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/medical/card-03.jpg',
                alt: 'alt',
              },
            },
          },
          {
            type: 'card',
            link: {
              href: '#',
              label:
                'Recursos para Hispanohablantes (Resources for Spanish-Speakers)',
            },
            classes: 'card-no-shadow',
            body: 'El Dr. Santiago López informa en temas relacionados a la atención médica tales como vacunas, noticias falsas, y ensayos clínicos.',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/medical/card-04.jpg',
                alt: 'alt',
              },
            },
          },
          {
            type: 'card',
            link: {
              href: '#',
              label: 'Collaborating to Address COVID-19',
            },
            classes: 'card-no-shadow',
            body: 'We’re collaborating across the healthcare innovation ecosystem to help advance research and address the COVID-19 global health crisis.',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/medical/card-05.jpg',
                alt: 'alt',
              },
            },
          },
          {
            type: 'card',
            link: {
              href: '#',
              label: 'Supporting Those Fighting on the Front Lines',
            },
            classes: 'card-no-shadow',
            body: 'The Pfizer Foundation is supporting our partners who are working tirelessly to address the evolving health needs related to COVID-19 in the U.S. and around the world.',
            feature: {
              fullIcon: 'fullscreen',
              openIcon: 'open_in_new',
              link: '#',
              ratios: 'media-4-3',
              img: {
                classes: 'object-fit',
                src: '/assets/images/medical/card-06.jpg',
                alt: 'alt',
              },
            },
          },
        ],
      },
    },
    {
      type: 'action-1v1',
      spacer: 'xl',
      bg: {
        classes: 'bg-shadow bg-fill-width',
      },
      text: {
        title: {
          label: 'Products',
          style: 'none',
          classes: 'mat-display-1',
        },
        classes: '',
        spacer: 'none',
        body: '<p>Every product is the result of 1,500 scientists overseeing more than 500,000 lab tests and over 36 clinical trials before the first prescription. </p>',
        actionsAlign: 'center center',
        actions: [
          {
            type: 'search-action',
            button: {
              label: 'Search',
              color: 'primary',
            },
            form: [
              {
                type: 'input',
                key: 'keys',
                placeholder: 'Looking for a product?',
                controlType: 'search',
                label: 'Looking for a product?',
                appearance: 'legacy',
              },
            ],
          },
        ],
      },
      shape: true,
    },
    {
      type: 'carousel-2v2',
      id: '',
      spacer: 'xl',
      classes: '',
      sliders: {
        params: {
          slidesPerView: 1.2,
          pagination: false,
          loop: true,
          autoplay: {
            delay: 5000,
          },
          breakpoints: {
            '600': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            '960': {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          },
        },
        elements: [
          {
            type: 'img',
            src: '/assets/images/logo/amazon.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/google.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/lenovo.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/paypal.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/shopify.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/spotify.svg',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
          {
            type: 'img',
            src: '/assets/images/logo/logo10.png',
            href: '#',
            alt: '',
            style: {
              width: 'auto',
              height: '40px',
            },
          },
        ],
      },
    },
    {
      type: 'showcase-1v3',
      title: {
        label: 'About',
        style: 'style-v1',
        classes: 'mat-display-1',
      },
      spacer: 'xxl',
      classes: 'text-light',
      bg: {
        classes: 'bg-fill-width overlay overlay-80',
        img: {
          hostClasses: 'bg-center',
          src: '/assets/images/hero/bg01.jpg',
          alt: 'page title',
        },
      },
      elements: [
        {
          type: 'text',
          spacer: 'none',
          style: {
            margin: '0 auto',
            'text-align': 'center',
            width: '600px',
          },
          body: 'Starting with Charles Pfizer inventing an almond-flavored antiparasite medicine in 1849, our people have always been innovators and trailblazers, committed to finding the next cure. ',
          actionsAlign: 'center center',
          actions: [
            {
              type: 'btn-video',
              color: 'primary',
              video: {
                options: {
                  controls: true,
                  aspectRatio: '16:9',
                  poster: '/assets/images/hero/bg02.jpg',
                  sources: [
                    {
                      src: '/assets/video/afterglow.mp4',
                      type: 'video/mp4',
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    {
      type: 'text',
      title: {
        label: 'Sign up for communications from Pfizer',
        style: 'style-v1',
        classes: 'mat-display-2',
      },
      spacer: 'xxl',
      body: '<p class="text-center">Receive the latest news from Pfizer in our monthly The Breakthrough newsletter and email alerts on a variety of topics.</p>',
      actionsAlign: 'center center',
      actions: [
        {
          type: 'btn-animate',
          label: 'Sign Up Now',
          href: '#',
          style: 'style-v1',
          icon: 'open_in_new',
        },
      ],
    },
  ],
});
Page.storyName = '预览';
Page.args = {
  pageContent$: content,
};
