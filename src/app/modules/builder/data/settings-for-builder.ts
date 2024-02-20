export const settings: any[] = [
  {
    label: '配置',
    elements: [
      {
        label: '全局',
        type: 'json',
        provide: 'CORE_CONFIG',
        icon: {
          svg: 'cog',
        },
      },
      {
        label: '菜单',
        type: 'json',
        provide: 'BRANDING',
        icon: {
          svg: 'view-compact-outline',
        },
      },
    ],
  },
];
