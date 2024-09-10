import {
  moduleMetadata,
  Meta,
  StoryObj,
  applicationConfig,
} from '@storybook/angular';

import { StorysModule } from '@core/module/storys.module';
import { IS_BUILDER_MODE } from '@core/token/token-providers';
import { of } from 'rxjs';
import { CustomTemplateComponent } from '@uiux/combs/other/custom-template/custom-template.component';
import { importProvidersFrom } from '@angular/core';
const meta: Meta<CustomTemplateComponent> = {
  title: 'Tailwind/Section',
  id: 'tailwind-section',
  component: CustomTemplateComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(StorysModule.forRoot())],
    }),
    moduleMetadata({
      declarations: [...StorysModule.forEntryComponents()],
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
};

export default meta;

type Story = StoryObj<CustomTemplateComponent>;

export const V1: Story = {};
V1.storyName = 'V1';
V1.args = {
  content: {
    type: 'custom-template',
    json: {},
    html: `<section class="py-10 bg-white sm:py-16 lg:py-24">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-2xl font-bold text-gray-800 sm:text-4xl sm:leading-tight">Trusted by world class companies, design teams & popular designers</h2>
        </div>

        <div class="grid items-center max-w-4xl grid-cols-2 mx-auto mt-12 md:mt-20 md:grid-cols-4 gap-x-10 gap-y-16">
            <div>
                <img class="object-contain w-full h-6 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-1.png" alt="" />
            </div>

            <div>
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-2.png" alt="" />
            </div>

            <div>
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-3.png" alt="" />
            </div>

            <div>
                <img class="object-contain w-full mx-auto h-7" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-4.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-5.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-6.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-7.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-8.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-9.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full mx-auto h-7" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-10.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-11.png" alt="" />
            </div>

            <div class="hidden md:block">
                <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-12.png" alt="" />
            </div>
        </div>

        <div class="flex items-center justify-center mt-10 space-x-3 md:hidden">
            <div class="w-2.5 h-2.5 rounded-full bg-blue-600 block"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-gray-300 block"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-gray-300 block"></div>
        </div>

        <p class="mt-10 text-base text-center text-gray-500 md:mt-20">and, 1000+ more companies</p>
    </div>
</section>
`,
  },
};

export const V2: Story = {};
V2.storyName = 'V2';
V2.args = {
  content: {
    type: 'custom-template',
    json: {},
    html: `<section class="py-10 bg-gray-100 sm:py-16 lg:py-24">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 sm:gap-x-12 gap-y-12">
            <div class="lg:col-span-2">
                <h2 class="text-3xl font-bold leading-tight text-gray-800 sm:text-4xl lg:text-5xl lg:leading-tight">
                    1 team.<br />
                    6+ years.<br />
                    300+ projects.<br />
                </h2>
                <p class="mt-6 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
            </div>

            <div class="lg:col-span-3 xl:col-span-4">
                <div class="grid items-center max-w-4xl grid-cols-2 mx-auto lg:grid-cols-4 gap-x-10 gap-y-16">
                    <div>
                        <img class="object-contain w-full h-6 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-1.png" alt="" />
                    </div>

                    <div>
                        <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-2.png" alt="" />
                    </div>

                    <div>
                        <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-3.png" alt="" />
                    </div>

                    <div>
                        <img class="object-contain w-full mx-auto h-7" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-4.png" alt="" />
                    </div>

                    <div class="hidden lg:block">
                        <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-5.png" alt="" />
                    </div>

                    <div class="hidden lg:block">
                        <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-6.png" alt="" />
                    </div>

                    <div class="hidden lg:block">
                        <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-7.png" alt="" />
                    </div>

                    <div class="hidden lg:block">
                        <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-8.png" alt="" />
                    </div>

                    <div class="hidden lg:block">
                        <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-9.png" alt="" />
                    </div>

                    <div class="hidden lg:block">
                        <img class="object-contain w-full mx-auto h-7" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-10.png" alt="" />
                    </div>

                    <div class="hidden lg:block">
                        <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-11.png" alt="" />
                    </div>

                    <div class="hidden lg:block">
                        <img class="object-contain w-full h-8 mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-12.png" alt="" />
                    </div>
                </div>

                <div class="flex items-center justify-start mt-10 space-x-3 lg:hidden">
                    <div class="w-2.5 h-2.5 rounded-full bg-blue-600 block"></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-gray-300 block"></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-gray-300 block"></div>
                </div>
            </div>
        </div>
    </div>
</section>
`,
  },
};

export const V3: Story = {};
V3.storyName = 'V3';
V3.args = {
  content: {
    type: 'custom-template',
    json: {},
    html: `<section class="py-10 bg-gray-100 sm:py-16 lg:py-24">
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="grid items-center grid-cols-1 gap-y-8 lg:grid-cols-2 gap-x-16 xl:gap-x-24">
            <div class="relative mb-12">
                <img class="w-full rounded-md" src="https://cdn.rareblocks.xyz/collection/celebration/images/content/1/team-work.jpg" alt="" />

                <div class="absolute w-full max-w-xs px-4 -translate-x-1/2 sm:px-0 sm:max-w-sm left-1/2 -bottom-12">
                    <div class="overflow-hidden bg-white rounded">
                        <div class="px-10 py-6">
                            <div class="flex items-center">
                                <p class="flex-shrink-0 text-3xl font-bold text-blue-600 sm:text-4xl">37%</p>
                                <p class="pl-6 text-sm font-medium text-black sm:text-lg">High Conversions <br />on Landing Pages</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div class="flex items-center justify-center w-16 h-16 bg-white rounded-full">
                    <svg class="w-8 h-8 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h2 class="mt-10 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">Build a perfect team within hours.</h2>
                <p class="mt-6 text-lg leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia conse duis enim velit mollit. Exercitation veniam.</p>
                <a href="#" title="" class="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 rounded-md mt-9 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80 focus:opacity-80" role="button"> Explore more </a>
            </div>
        </div>
    </div>
</section>
`,
  },
};
