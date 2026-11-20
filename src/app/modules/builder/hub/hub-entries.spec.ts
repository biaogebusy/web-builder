import { buildHubMenu, HUB_MENU_KEYS } from './hub-entries';

describe('management menu groups', () => {
  it('translates section headings and keeps fixed routes and permissions', () => {
    const labels: Record<string, string> = {
      'BUILDER.HUB.MENU': 'Manage',
      'BUILDER.HUB.CONTENT_TITLE': 'Content',
      'BUILDER.HUB.APPEARANCE_TITLE': 'Appearance',
      'BUILDER.HUB.SYSTEM_TITLE': 'System',
    };
    const menu = buildHubMenu(key => labels[key] || key);
    expect(menu.href).toBe('/builder/hub');
    const translatedGroups = new Set(Object.values(labels));
    expect(menu.child?.filter(item => translatedGroups.has(item.group || '')).map(item => item.group))
      .toEqual(['Content', 'Appearance', 'Appearance', 'Appearance',
        'System', 'System', 'System']);
    expect(menu.child?.find(item => item.href === '/builder/node/uiux')?.params.reqRoles)
      .toEqual(['administrator']);
    expect(HUB_MENU_KEYS).toEqual(expect.arrayContaining(Object.keys(labels)));
  });
});
