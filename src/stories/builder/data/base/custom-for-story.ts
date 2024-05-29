import { Default as CustomTeplate } from '@stories/builder/CustomTemplate.stories';

export const custom: any[] = [
  {
    label: '静态数据',
    icon: {
      svg: 'code-json',
    },
    content: CustomTeplate.args?.content,
  },
  {
    label: 'API',
    icon: {
      svg: 'api',
    },
    content: {
      type: 'custom-template',
      isAPI: true,
      api: '/api/v1/content',
      html: `<div class="flex flex-wrap">
    {{#each rows}}
    <div class="flex-12/12 sm:flex-6/12 md:flex-4/12">
        <div class="m-3 shadow-md transition-all flex flex-col break-all rounded-md overflow-hidden hover:shadow-lg">
            <a href="{{url}}"><img class="object-cover w-full" height="200px" src="{{img}}" /></a>
            <div class="p-5">
                <a class="!text-black opacity-95 hover:!opacity-80 text-lg one-line" href="{{url}}">{{title}}</a>
                <div class="three-line opacity-90">{{body}}</div>
                <div class="footer flex items-center mt-5">
                    <img class="w-10 h-10 rounded-full mr-3" src="{{picture}}" />
                    <div class="flex flex-col">
                        <div class="font-bold">{{user}}</div>
                        <div class="small">{{created}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{/each}}
</div>`,
    },
  },
];
