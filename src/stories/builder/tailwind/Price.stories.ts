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
  title: 'Tailwind/Price',
  id: 'tailwind-price',
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
        <div class="max-w-xl mx-auto text-center">
            <h2 class="text-4xl font-bold text-black lg:text-5xl sm:text-5xl">Pricing &amp; Plans</h2>
            <p class="mt-4 text-lg leading-relaxed text-gray-600">Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
        </div>

        <!-- lg+ -->
        <div class="hidden mt-16 lg:block">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="py-8 pr-4"></th>

                        <th class="px-4 py-8 text-center">
                            <span class="text-base font-medium text-blue-600"> Free </span>
                            <p class="mt-6 text-6xl font-bold">$0</p>
                            <p class="mt-2 text-base font-normal text-gray-500">Per month</p>
                        </th>

                        <th class="px-4 py-8 text-center">
                            <span class="text-base font-medium text-blue-600"> Team </span>
                            <p class="mt-6 text-6xl font-bold">$99</p>
                            <p class="mt-2 text-base font-normal text-gray-500">Per month</p>
                        </th>

                        <th class="px-4 py-8 text-center bg-gray-900 rounded-t-xl">
                            <span class="px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-full"> Popular </span>
                            <p class="mt-6 text-6xl font-bold text-white">$150</p>
                            <p class="mt-2 text-base font-normal text-gray-200">Per month</p>
                        </th>

                        <th class="px-4 py-8 text-center">
                            <span class="text-base font-medium text-blue-600"> Enterprise </span>
                            <p class="mt-6 text-6xl font-bold">$490</p>
                            <p class="mt-2 text-base font-normal text-gray-500">Per month</p>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td class="py-4 pr-4 font-medium border-b border-gray-200">Website number</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">01</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">10</td>

                        <td class="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">50</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">Unlimited</td>
                    </tr>

                    <tr>
                        <td class="py-4 pr-4 font-medium border-b border-gray-200">Server storage</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">100 GB</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">500 GB</td>

                        <td class="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">1 TB</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">Unlimited</td>
                    </tr>

                    <tr>
                        <td class="py-4 pr-4 font-medium border-b border-gray-200">Database</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">-</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">15</td>

                        <td class="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">Unlimited</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">Unlimited</td>
                    </tr>

                    <tr>
                        <td class="py-4 pr-4 font-medium border-b border-gray-200">Unmetered Bandwidth</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">-</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">
                            <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </td>

                        <td class="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                            <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">
                            <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </td>
                    </tr>

                    <tr>
                        <td class="py-4 pr-4 font-medium border-b border-gray-200">SSD Disk</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">-</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">-</td>

                        <td class="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                            <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">
                            <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </td>
                    </tr>

                    <tr>
                        <td class="py-4 pr-4 font-medium border-b border-gray-200">VCPUS Fontworld</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">-</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">-</td>

                        <td class="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                            <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">
                            <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </td>
                    </tr>

                    <tr>
                        <td class="py-4 pr-4 font-medium border-b border-gray-200">WordPress install</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">-</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">-</td>

                        <td class="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                            <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">
                            <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </td>
                    </tr>

                    <tr>
                        <td class="py-4 pr-4 font-medium border-b border-gray-200">Server speed</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">-</td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">-</td>

                        <td class="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                            <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </td>

                        <td class="px-4 py-4 text-center border-b border-gray-200">
                            <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </td>
                    </tr>

                    <tr>
                        <td class="py-6 pr-4"></td>

                        <td class="px-4 py-6 text-center">
                            <a href="#" title="" class="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700">
                                Get Started
                                <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </td>

                        <td class="px-4 py-6 text-center">
                            <a href="#" title="" class="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700">
                                Get Started
                                <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </td>

                        <td class="px-4 py-6 text-center text-white bg-yellow-500 rounded-b-xl">
                            <a href="#" title="" class="inline-flex items-center font-semibold text-white">
                                Get Started
                                <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </td>

                        <td class="px-4 py-6 text-center">
                            <a href="#" title="" class="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700">
                                Get Started
                                <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- xs to lg -->
    <div class="block mt-12 border-t border-b border-gray-200 divide-y divide-gray-200 lg:hidden">
        <div class="grid grid-cols-4 text-center divide-x divide-gray-200">
            <div class="px-2 py-2">
                <span class="text-sm font-medium text-blue-600"> Free </span>
                <p class="mt-2 text-xl font-bold">$0</p>
                <span class="mt-1 text-sm font-normal text-gray-500"> Per month </span>
            </div>

            <div class="px-2 py-2">
                <span class="text-sm font-medium text-blue-600"> Team </span>
                <p class="mt-2 text-xl font-bold">$99</p>
                <span class="mt-1 text-sm font-normal text-gray-500"> Per month </span>
            </div>

            <div class="px-2 py-2">
                <span class="text-sm font-medium text-blue-600"> Popular </span>
                <p class="mt-2 text-xl font-bold">$150</p>
                <span class="mt-1 text-sm font-normal text-gray-500"> Per month </span>
            </div>

            <div class="px-2 py-2">
                <span class="text-sm font-medium text-blue-600"> Enterprise </span>
                <p class="mt-2 text-xl font-bold">$490</p>
                <span class="mt-1 text-sm font-normal text-gray-500"> Per month </span>
            </div>
        </div>

        <div class="px-2 py-4 sm:px-4">
            <p class="font-semibold">Website number</p>
        </div>

        <div class="grid grid-cols-4 text-center divide-x divide-gray-200">
            <div class="px-2 py-2">01</div>

            <div class="px-2 py-2">10</div>

            <div class="px-2 py-2">100</div>

            <div class="px-2 py-2">Unlimited</div>
        </div>

        <div class="px-2 py-4 sm:px-4">
            <p class="font-semibold">Server storage</p>
        </div>

        <div class="grid grid-cols-4 text-center divide-x divide-gray-200">
            <div class="px-2 py-2">100 GB</div>

            <div class="px-2 py-2">500 GB</div>

            <div class="px-2 py-2">1 TB</div>

            <div class="px-2 py-2">Unlimited</div>
        </div>

        <div class="px-2 py-4 sm:px-4">
            <p class="font-semibold">Database</p>
        </div>

        <div class="grid grid-cols-4 text-center divide-x divide-gray-200">
            <div class="px-2 py-2">-</div>

            <div class="px-2 py-2">15</div>

            <div class="px-2 py-2">Unlimited</div>

            <div class="px-2 py-2">Unlimited</div>
        </div>

        <div class="px-2 py-4 sm:px-4">
            <p class="font-semibold">Unmetered bandwidth</p>
        </div>

        <div class="grid grid-cols-4 text-center divide-x divide-gray-200">
            <div class="px-2 py-2">-</div>

            <div class="px-2 py-2">
                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            </div>

            <div class="px-2 py-2">
                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            </div>

            <div class="px-2 py-2">
                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            </div>
        </div>

        <div class="px-2 py-4 sm:px-4">
            <p class="font-semibold">SSD Disk</p>
        </div>

        <div class="grid grid-cols-4 text-center divide-x divide-gray-200">
            <div class="px-2 py-2">-</div>

            <div class="px-2 py-2">
                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            </div>

            <div class="px-2 py-2">
                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            </div>

            <div class="px-2 py-2">
                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            </div>
        </div>

        <div class="px-2 py-4 sm:px-4">
            <p class="font-semibold">VCPUS Fontworld</p>
        </div>

        <div class="grid grid-cols-4 text-center divide-x divide-gray-200">
            <div class="px-2 py-2">-</div>

            <div class="px-2 py-2">
                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            </div>

            <div class="px-2 py-2">
                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            </div>

            <div class="px-2 py-2">
                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            </div>
        </div>

        <div class="px-2 py-4 sm:px-4">
            <p class="font-semibold">WordPress install</p>
        </div>

        <div class="grid grid-cols-4 text-center divide-x divide-gray-200">
            <div class="px-2 py-2">-</div>

            <div class="px-2 py-2">
                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            </div>

            <div class="px-2 py-2">
                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            </div>

            <div class="px-2 py-2">
                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            </div>
        </div>

        <div class="grid grid-cols-4 text-center divide-x divide-gray-200">
            <div class="px-1 py-2 sm:px-4">
                <span class="text-sm font-medium text-blue-600"> Free </span>
                <p class="mt-2 text-xl font-bold">$0</p>
                <span class="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                <a href="#" title="" class="flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700" role="button"> Get Started </a>
            </div>

            <div class="px-1 py-2 sm:px-4">
                <span class="text-sm font-medium text-blue-600"> Team </span>
                <p class="mt-2 text-xl font-bold">$99</p>
                <span class="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                <a href="#" title="" class="flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700" role="button"> Get Started </a>
            </div>

            <div class="px-1 py-2 sm:px-4">
                <span class="text-sm font-medium text-blue-600"> Popular </span>
                <p class="mt-2 text-xl font-bold">$150</p>
                <span class="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                <a href="#" title="" class="flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700" role="button"> Get Started </a>
            </div>

            <div class="px-1 pt-2 pb-4 sm:px-4">
                <span class="text-sm font-medium text-blue-600"> Enterprise </span>
                <p class="mt-2 text-xl font-bold">$490</p>
                <span class="mt-1 text-sm font-normal text-gray-500"> Per month </span>
                <a href="#" title="" class="flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700" role="button"> Get Started </a>
            </div>
        </div>
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
    html: `<section class="py-10 bg-gray-50 sm:py-16 lg:py-24">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Pricing & Plans</h2>
            <p class="max-w-md mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
        </div>

        <div class="mt-10">
            <div class="flex items-center justify-center space-x-2.5">
                <span class="text-base font-medium text-gray-900"> Monthly </span>

                <button type="button" class="relative inline-flex flex-shrink-0 h-6 py-0.5 transition-colors duration-200 ease-in-out bg-transparent border-2 border-blue-600 rounded-full cursor-pointer w-12 focus:outline-none" role="switch">
                    <span aria-hidden="true" class="inline-block w-4 h-4 transition duration-200 ease-in-out translate-x-6 bg-blue-600 rounded-full shadow pointer-events-none"></span>
                </button>

                <span class="text-base font-medium text-gray-900"> Yearly </span>
            </div>
        </div>

        <div class="grid max-w-3xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 mt-14 md:gap-9">
            <div class="overflow-hidden bg-transparent border-2 border-gray-200 rounded-md">
                <div class="p-6 md:py-8 md:px-9">
                    <h3 class="text-xl font-semibold text-black">Personal</h3>
                    <p class="mt-2.5 text-sm text-gray-600">All the basic features to boost your freelance career</p>

                    <div class="flex items-end mt-5">
                        <div class="flex items-start">
                            <span class="text-xl font-medium text-black"> $ </span>
                            <p class="text-6xl font-medium tracking-tight">39</p>
                        </div>
                        <span class="ml-0.5 text-lg text-gray-600"> / month </span>
                    </div>

                    <a
                        href="#"
                        title=""
                        class="inline-flex items-center justify-center w-full px-4 py-3 mt-6 font-semibold text-gray-900 transition-all duration-200 bg-transparent border-2 rounded-full border-fuchsia-600 hover:bg-fuchsia-600 hover:text-white focus:text-white focus:bg-fuchsia-600"
                        role=""
                    >
                        Start 14 Days Free Trial
                    </a>

                    <ul class="flex flex-col mt-8 space-y-4">
                        <li class="inline-flex items-center space-x-2">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-base font-medium text-gray-900"> 1 Domain License </span>
                            <svg class="w-4 h-4 ml-0.5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </li>

                        <li class="inline-flex items-center space-x-2">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-base font-medium text-gray-900"> Full Celebration Library </span>
                        </li>

                        <li class="inline-flex items-center space-x-2">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-base font-medium text-gray-900"> 120+ Coded Blocks </span>
                        </li>

                        <li class="inline-flex items-center space-x-2">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            <strike class="text-base font-medium text-gray-400"> Design Files Included </strike>
                        </li>

                        <li class="inline-flex items-center space-x-2">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            <strike class="text-base font-medium text-gray-400"> Premium Support </strike>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="overflow-hidden bg-white border-2 border-transparent rounded-md">
                <div class="p-6 md:py-8 md:px-9">
                    <h3 class="text-xl font-semibold text-black">Agency</h3>
                    <p class="mt-2.5 text-sm text-gray-600">All the extended features to boost your agency career</p>

                    <div class="flex items-end mt-5">
                        <div class="flex items-start">
                            <span class="text-xl font-medium text-black"> $ </span>
                            <p class="text-6xl font-medium tracking-tight">99</p>
                        </div>
                        <span class="ml-0.5 text-lg text-gray-600"> / month </span>
                    </div>

                    <a href="#" title="" class="inline-flex items-center justify-center w-full px-4 py-3 mt-6 font-semibold text-white transition-all duration-200 border-2 border-transparent rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80 focus:opacity-80" role="">
                        Start 14 Days Free Trial
                    </a>

                    <ul class="flex flex-col mt-8 space-y-4">
                        <li class="inline-flex items-center space-x-2">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-base font-medium text-gray-900"> 100 Domain License </span>
                            <svg class="w-4 h-4 ml-0.5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </li>

                        <li class="inline-flex items-center space-x-2">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-base font-medium text-gray-900"> Full Celebration Library </span>
                        </li>

                        <li class="inline-flex items-center space-x-2">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-base font-medium text-gray-900"> 120+ Coded Blocks </span>
                        </li>

                        <li class="inline-flex items-center space-x-2">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-base font-medium text-gray-900"> Design Files Included </span>
                        </li>

                        <li class="inline-flex items-center space-x-2">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-base font-medium text-gray-900"> Premium Support </span>
                        </li>
                    </ul>
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
    html: `<section class="py-10 bg-gray-900 sm:py-16 lg:py-24">
    <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:items-stretch md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10">
            <div class="flex flex-col justify-between lg:py-5">
                <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:leading-tight lg:text-5xl">Join 35k+ web professionals & build your website</h2>

                <div class="mt-auto">
                    <div class="flex items-center">
                        <svg class="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                        <svg class="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                        <svg class="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                        <svg class="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                        <svg class="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                    </div>

                    <blockquote class="mt-6">
                        <p class="text-lg leading-relaxed text-white">You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.</p>
                    </blockquote>

                    <div class="flex items-center mt-8">
                        <img class="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/pricing/2/avatar.jpg" alt="" />
                        <div class="ml-4">
                            <p class="text-base font-semibold text-white">Brooklyn Simmons</p>
                            <p class="mt-px text-sm text-gray-400">Digital Marketer</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="">
                <div class="overflow-hidden bg-white rounded-md">
                    <div class="p-10">
                        <h3 class="text-xs font-semibold tracking-widest text-purple-600 uppercase">Single pack</h3>
                        <p class="mt-4 text-6xl font-bold text-black">$79</p>

                        <ul class="flex flex-col mt-8 space-y-4">
                            <li class="inline-flex items-center space-x-2">
                                <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-base font-medium text-gray-900"> 1 Domain License </span>
                            </li>

                            <li class="inline-flex items-center space-x-2">
                                <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-base font-medium text-gray-900"> Full Celebration Library </span>
                            </li>

                            <li class="inline-flex items-center space-x-2">
                                <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-base font-medium text-gray-900"> 120+ Coded Blocks </span>
                            </li>

                            <li class="inline-flex items-center space-x-2">
                                <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-base font-medium text-gray-900"> Design Files Included </span>
                            </li>

                            <li class="inline-flex items-center space-x-2">
                                <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                                <span class="pb-0.5 text-base font-medium text-gray-900 border-b border-black border-dashed"> Premium Support </span>
                            </li>
                        </ul>

                        <a href="#" title="" class="inline-flex items-center justify-center w-full px-8 py-4 mt-10 font-semibold text-white transition-all duration-200 rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80 focus:opacity-80" role="button"> Get full access </a>

                        <div class="flex items-center mt-5">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span class="ml-2 text-sm text-gray-500"> 14 Days Moneyback Guarantee </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
`,
  },
};
