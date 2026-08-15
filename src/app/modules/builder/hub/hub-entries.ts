import { IMainMenu } from '@core/interface/branding/IBranding';

/** Management center entries (data-driven): shared by the hub page group cards and the sidebar "Manage" menu */
export interface IHubEntry {
  /** i18n key */
  label: string;
  /** i18n key */
  desc: string;
  link: string;
  /** MDI icon name (served by the backend /assets/mdi.svg), shared by cards and sidebar submenus */
  icon: string;
  /** Required roles; entry hiding and route guards are a double safeguard (guards live on each route) */
  reqRoles?: string[];
}

export interface IHubGroup {
  /** i18n key */
  title: string;
  entries: IHubEntry[];
}

export const HUB_GROUPS: IHubGroup[] = [
  {
    // Node content and landing pages are both "published things on the site",
    // so they share one group; the two cards are told apart by their own
    // labels and descriptions (nodes of all types vs builder-built landing pages)
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

/** i18n keys for the sidebar "Manage" menu, prefetched via translate.stream */
export const HUB_MENU_KEYS: string[] = [
  'BUILDER.HUB.MENU',
  ...HUB_GROUPS.flatMap(group => group.entries.map(entry => entry.label)),
];

/**
 * Builds the sidebar "Manage" menu items from the entry data, structurally
 * identical to BUILDER_CONFIG.menu.
 *
 * Only fixed management entries are included: publish entries are generated
 * dynamically from the site's actual content types and vary in number (5 by
 * default, more can be enabled via core_config), which would stretch a
 * permanent sidebar menu, so they only appear on the hub page. The sidebar is
 * a flat quick channel for returning users (no descriptions); the hub is the
 * hub with explanations - the two serve different purposes.
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
