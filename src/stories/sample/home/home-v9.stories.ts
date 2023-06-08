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
  title: '示例页面/首页示例/09 疫苗科学',
  id: 'home-v9',
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
Page.storyName = '预览';
const content = of({
  title: 'Science',
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
      type: 'hero-2v1',
      theme: 'text-light',
      params: {
        height: '750px',
      },
      text: {
        title: {
          label: 'Advancing Vaccine Science with Maternal Immunization',
          style: 'style-v1',
          classes: 'mat-display-4',
        },
        spacer: 'xl',
        classes: 'xy-center text-center',
        'style-': {
          width: '50%',
          left: '0%',
          top: '5%',
        },
        bg: {
          classes: 'bg-shadow overlay overlay-60',
          img: {
            src: '/assets/images/medical/hero-01.jpeg',
            mobile: '/assets/images/medical/hero-01.jpeg',
          },
        },
        body: 'Pfizer works tirelessly to research and develop vaccines that through maternal immunization may help protect young infants from certain diseases. We are leveraging our years of scientific expertise to deliver vaccines that have the potential to boost maternal immunity—a pregnant person’s natural ability to provide protection to their growing fetuses through the transfer of antibodies through the placenta.1',
        actionsAlign: 'center center',
        actions: [
          {
            type: 'btn',
            mode: 'raised',
            color: 'primary',
            href: '#',
            label: 'Learn More',
          },
        ],
      },
    },
    {
      type: 'showcase-2v2',
      text: {
        title: {
          label: 'Areas of Focus',
          style: 'style-v4',
          classes: 'mat-display-0 bold',
        },
        body: 'Revolutionary medicines enable us to enrich and extend life for people living with all types of diseases. ',
      },
      row: '3',
      elements: [
        {
          feature: {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-140',
            img: {
              classes: 'object-fit',
              src: '/assets/images/medical/showcase-07.jpeg',
              alt: 'lazyload',
            },
          },
          link: {
            href: '#',
            label: 'Rare Disease',
          },
        },
        {
          feature: {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-140',
            img: {
              classes: 'object-fit',
              src: '/assets/images/medical/showcase-08.jpeg',
              alt: 'lazyload',
            },
          },
          link: {
            href: '#',
            label: 'Internal Medicine',
          },
        },
        {
          feature: {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-140',
            img: {
              classes: 'object-fit',
              src: '/assets/images/medical/showcase-09.jpeg',
              alt: 'lazyload',
            },
          },
          link: {
            href: '#',
            label: 'Inflammation & Immunology',
          },
        },
        {
          feature: {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-140',
            img: {
              classes: 'object-fit',
              src: '/assets/images/medical/showcase-10.jpeg',
              alt: 'lazyload',
            },
          },
          link: {
            href: '#',
            label: 'Vaccines',
          },
        },
        {
          feature: {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-140',
            img: {
              classes: 'object-fit',
              src: '/assets/images/medical/showcase-11.jpeg',
              alt: 'lazyload',
            },
          },
          link: {
            href: '#',
            label: 'Oncology',
          },
        },
        {
          feature: {
            type: 'feature-box',
            fullIcon: 'fullscreen',
            openIcon: 'open_in_new',
            link: '#',
            ratios: 'media-140',
            img: {
              classes: 'object-fit',
              src: '/assets/images/medical/showcase-12.jpeg',
              alt: 'lazyload',
            },
          },
          link: {
            href: '#',
            label: 'Anti Infectives',
          },
        },
      ],
    },
    {
      type: 'showcase-4v1',
      spacer: 'lg',
      text: {
        title: {
          label: 'Pipeline Snapshot as of May 2, 2023',
          style: 'style-v1',
        },
      },
      bg: {
        classes: 'bg-fill-width bg-shadow',
      },
      elements: [
        {
          icon: {
            name: 'fingerprint',
          },
          digit: {
            value: 38,
            label: '+',
          },
          title: 'Phase 1',
        },
        {
          icon: {
            name: 'verified_user',
          },
          digit: {
            value: 28,
            label: '+',
          },
          title: 'Phase 2',
        },
        {
          icon: {
            name: 'android',
          },
          digit: {
            value: 23,
            label: '+',
          },
          title: 'Phase 3',
        },
        {
          icon: {
            name: 'mail',
          },
          digit: {
            value: 12,
            label: '+',
          },
          title: 'Registration',
        },
        {
          icon: {
            name: 'mail',
          },
          digit: {
            value: 101,
            label: '+',
          },
          title: 'Total',
        },
      ],
    },
    {
      type: 'carousel-1v2',
      title: {
        label: 'Research Sites',
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
      type: 'list-2v1',
      title: {
        label: 'Latest Articles',
        style: 'style-v4',
        classes: 'mat-display-1',
      },
      params: {
        apiBak: '/api/v2/xxx',
      },
      more: {
        label: 'More Articles',
        href: '#',
        mode: 'raised',
        color: 'primary',
      },
      elements: [
        {
          link: {
            label:
              'Cancer Biomarkers: Paving the Way for Better Lung Cancer Treatment',
            href: '#',
          },
          subTitle: 'Science & Innovation',
          body: 'Advancements with cancer biomarkers are paving the way for better lung cancer treatments and personalization for patients.',
          img: {
            src: '/assets/images/medical/showcase-03.jpg',
            alt: '',
          },
        },
        {
          link: {
            label:
              'Maternal Immunization: Protecting Children from RSV and GBS',
            href: '#',
          },
          subTitle: 'Science & Innovation',
          body: 'Scientists at the forefront of fetal health innovation are studying ways that vaccines given during pregnancy can continue to protect children in the months after birth.',
          img: {
            src: '/assets/images/medical/showcase-04.jpg',
            alt: '',
          },
        },
        {
          link: {
            label:
              'Pfizer’s Biopharma Global Chief Marketing Officer Drew Panayiotou is ‘Radically Obsessed’ with Listening to Patients',
            href: '#',
          },
          subTitle: 'Real People',
          body: "For Pfizer's Biopharma Global Chief Marketing Officer Drew Panayiotou, working at Pfizer comes with an enormous perk. The potential to change the world.",
          img: {
            src: '/assets/images/medical/showcase-05.jpg',
            alt: '',
          },
        },
      ],
    },
  ],
});
Page.args = {
  pageContent$: content,
};
