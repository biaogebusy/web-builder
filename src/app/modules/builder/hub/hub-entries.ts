import { IMainMenu } from '@core/interface/branding/IBranding';

/** 管理中心入口(数据驱动):hub 页分组卡片与侧栏"管理"菜单共用同一份数据 */
export interface IHubEntry {
  /** i18n key */
  label: string;
  /** i18n key */
  desc: string;
  link: string;
  /** 需要的角色,入口隐藏与路由 guard 双保险(guard 在各自路由上) */
  reqRoles?: string[];
}

export interface IHubGroup {
  /** i18n key */
  title: string;
  /** i18n key */
  desc: string;
  entries: IHubEntry[];
}

export const HUB_GROUPS: IHubGroup[] = [
  {
    title: 'BUILDER.HUB.CONTENT_TITLE',
    desc: 'BUILDER.HUB.CONTENT_DESC',
    entries: [
      {
        label: 'BUILDER.HUB.MANAGE_ENTRY',
        desc: 'BUILDER.HUB.MANAGE_ENTRY_DESC',
        link: '/builder/node/manage',
      },
    ],
  },
  {
    title: 'BUILDER.HUB.PAGES_TITLE',
    desc: 'BUILDER.HUB.PAGES_DESC',
    entries: [
      {
        label: 'BUILDER.HUB.PAGE_LIST_ENTRY',
        desc: 'BUILDER.HUB.PAGE_LIST_ENTRY_DESC',
        link: '/builder/page-list',
      },
    ],
  },
  {
    title: 'BUILDER.HUB.APPEARANCE_TITLE',
    desc: 'BUILDER.HUB.APPEARANCE_DESC',
    entries: [
      {
        label: 'BUILDER.HUB.HEADER_ENTRY',
        desc: 'BUILDER.HUB.HEADER_ENTRY_DESC',
        link: '/builder/edit-branding/header',
      },
      {
        label: 'BUILDER.HUB.FOOTER_ENTRY',
        desc: 'BUILDER.HUB.FOOTER_ENTRY_DESC',
        link: '/builder/edit-branding/footer',
      },
      {
        label: 'BUILDER.HUB.UIUX_ENTRY',
        desc: 'BUILDER.HUB.UIUX_ENTRY_DESC',
        link: '/builder/node/uiux',
        reqRoles: ['administrator'],
      },
    ],
  },
  {
    title: 'BUILDER.HUB.SYSTEM_TITLE',
    desc: 'BUILDER.HUB.SYSTEM_DESC',
    entries: [
      {
        label: 'BUILDER.HUB.SETTINGS_ENTRY',
        desc: 'BUILDER.HUB.SETTINGS_ENTRY_DESC',
        link: '/builder/settings',
      },
      {
        label: 'BUILDER.HUB.CONFIG_CHECK_ENTRY',
        desc: 'BUILDER.HUB.CONFIG_CHECK_ENTRY_DESC',
        link: '/builder/config-check',
      },
    ],
  },
];

/** 侧栏"管理"菜单相关的 i18n key,供 translate.stream 预取 */
export const HUB_MENU_KEYS: string[] = [
  'BUILDER.HUB.MENU',
  ...HUB_GROUPS.flatMap(group => group.entries.map(entry => entry.label)),
];

/** 由入口数据构建侧栏"管理"菜单项,与 BUILDER_CONFIG.menu 同构 */
export function buildHubMenu(translate: (key: string) => string): IMainMenu {
  return {
    label: translate('BUILDER.HUB.MENU'),
    href: '/builder/hub',
    icon: { svg: 'view-grid-outline' },
    child: HUB_GROUPS.flatMap(group =>
      group.entries.map(entry => ({
        label: translate(entry.label),
        href: entry.link,
        ...(entry.reqRoles ? { params: { reqRoles: entry.reqRoles } } : {}),
      }))
    ),
  };
}
