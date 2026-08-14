import { IMainMenu } from '@core/interface/branding/IBranding';

/** 管理中心入口(数据驱动):hub 页分组卡片与侧栏"管理"菜单共用同一份数据 */
export interface IHubEntry {
  /** i18n key */
  label: string;
  /** i18n key */
  desc: string;
  link: string;
  /** MDI 图标名(后端 /assets/mdi.svg 提供),卡片与侧栏子菜单共用 */
  icon: string;
  /** 需要的角色,入口隐藏与路由 guard 双保险(guard 在各自路由上) */
  reqRoles?: string[];
}

export interface IHubGroup {
  /** i18n key */
  title: string;
  entries: IHubEntry[];
}

export const HUB_GROUPS: IHubGroup[] = [
  {
    // 节点内容与着陆页都是"站点上已发布的东西",合并为一组;
    // 两张卡靠标签与描述自身区分(所有类型的节点 vs 构建器搭建的着陆页)
    title: 'BUILDER.HUB.CONTENT_TITLE',
    entries: [
      {
        label: 'BUILDER.HUB.MANAGE_ENTRY',
        desc: 'BUILDER.HUB.MANAGE_ENTRY_DESC',
        link: '/builder/node/manage',
        icon: 'file-document-multiple-outline',
      },
      {
        label: 'BUILDER.HUB.PAGE_LIST_ENTRY',
        desc: 'BUILDER.HUB.PAGE_LIST_ENTRY_DESC',
        link: '/builder/page-list',
        icon: 'web',
      },
    ],
  },
  {
    title: 'BUILDER.HUB.APPEARANCE_TITLE',
    entries: [
      {
        label: 'BUILDER.HUB.HEADER_ENTRY',
        desc: 'BUILDER.HUB.HEADER_ENTRY_DESC',
        link: '/builder/edit-branding/header',
        icon: 'page-layout-header',
      },
      {
        label: 'BUILDER.HUB.FOOTER_ENTRY',
        desc: 'BUILDER.HUB.FOOTER_ENTRY_DESC',
        link: '/builder/edit-branding/footer',
        icon: 'page-layout-footer',
      },
      {
        label: 'BUILDER.HUB.UIUX_ENTRY',
        desc: 'BUILDER.HUB.UIUX_ENTRY_DESC',
        link: '/builder/node/uiux',
        icon: 'puzzle-outline',
        reqRoles: ['administrator'],
      },
    ],
  },
  {
    title: 'BUILDER.HUB.SYSTEM_TITLE',
    entries: [
      {
        label: 'BUILDER.HUB.SETTINGS_ENTRY',
        desc: 'BUILDER.HUB.SETTINGS_ENTRY_DESC',
        link: '/builder/settings',
        icon: 'cog-outline',
      },
      {
        label: 'BUILDER.HUB.CONFIG_CHECK_ENTRY',
        desc: 'BUILDER.HUB.CONFIG_CHECK_ENTRY_DESC',
        link: '/builder/config-check',
        icon: 'clipboard-check-outline',
      },
    ],
  },
];

/** 侧栏"管理"菜单相关的 i18n key,供 translate.stream 预取 */
export const HUB_MENU_KEYS: string[] = [
  'BUILDER.HUB.MENU',
  ...HUB_GROUPS.flatMap(group => group.entries.map(entry => entry.label)),
];

/**
 * 由入口数据构建侧栏"管理"菜单项,与 BUILDER_CONFIG.menu 同构。
 *
 * 只含固定的管理入口:发布入口按站点实际内容类型动态生成、数量不定(默认 5 种,
 * core_config 可再增开),放进常驻侧栏会把菜单撑长,因此只在 hub 页呈现。
 * 侧栏是老用户的快捷通道(扁平、无描述),hub 是带说明的枢纽,两者定位不同。
 */
export function buildHubMenu(translate: (key: string) => string): IMainMenu {
  return {
    label: translate('BUILDER.HUB.MENU'),
    href: '/builder/hub',
    icon: { svg: 'view-grid-outline' },
    child: HUB_GROUPS.flatMap(group =>
      group.entries.map(entry => ({
        label: translate(entry.label),
        href: entry.link,
        icon: { svg: entry.icon },
        ...(entry.reqRoles ? { params: { reqRoles: entry.reqRoles } } : {}),
      }))
    ),
  };
}
