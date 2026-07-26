import type { IFooter, IHeader, IMainMenu } from '@core/interface/branding/IBranding';
import { buildFooterConfig, buildHeaderConfig } from './branding-config.util';

describe('branding config builders', () => {
  it('assembles header form values while preserving unrelated fields', () => {
    const header: IHeader = {
      params: { themeSwitch: false, userInfo: true, menuHoverOpen: false },
      logo: {
        label: 'Old logo',
        href: '/old',
        version: false,
        img: { src: '/old.svg', alt: 'Old', width: 80, height: 20, classes: 'keep-me' },
      },
      mainMenu: [{ label: 'Old menu', href: '/old' }],
      search: {
        enable: true,
        placeholder: 'Search',
        tooltip: 'Find',
        link: '/search',
        type: 'page',
        key: 'q',
        value: 'keep-me',
      },
      actions: [{ label: 'Old action', href: '/old-action' }],
    };
    const menuItems: IMainMenu[] = [{ label: 'New menu', href: '/new' }];

    const result = buildHeaderConfig(
      header,
      { themeSwitch: true },
      {
        label: 'New logo',
        href: '/',
        version: true,
        invert: 'dark',
        src: '/new.svg',
        alt: 'New',
        width: '120',
        height: '30',
      },
      menuItems,
      { placeholder: 'Find something' },
      { actions: [{ label: 'New action', href: '/new-action' }] }
    );

    expect(result.params).toEqual({ themeSwitch: true, userInfo: true, menuHoverOpen: false });
    expect(result.logo).toMatchObject({
      label: 'New logo',
      href: '/',
      version: true,
      invert: 'dark',
    });
    expect(result.logo?.img).toMatchObject({
      src: '/new.svg',
      alt: 'New',
      width: 120,
      height: 30,
      classes: 'keep-me',
    });
    expect(result.mainMenu).toBe(menuItems);
    expect(result.search).toMatchObject({ placeholder: 'Find something', value: 'keep-me' });
    expect(result.actions).toEqual([{ label: 'New action', href: '/new-action' }]);
  });

  it('assembles footer form values and keeps backend-only fields', () => {
    const footer: IFooter = {
      params: { mode: 'light', shape: true },
      footerBrand: {
        logo: { img: { src: '/old.svg', alt: 'Old' } },
        summary: 'Old summary',
        social: [{ label: 'Old', icon: { svg: 'old' }, href: '/old' }],
      },
      mainMenu: [{ label: 'Old group', child: [] }],
      mobileMenu: [{ label: 'Old mobile', child: [] }],
      footerNewsletter: {
        params: { webform_id: 'old-form' },
        label: 'Old newsletter',
        summary: 'Old description',
        form: [{ key: 'email' }],
        action: { label: 'Join' },
      },
      footerBottom: { left: 'old-left', right: [{ label: 'Old link', href: '/old' }] },
      copyRight: 'keep-me',
    };

    const result = buildFooterConfig(
      footer,
      { mode: 'inverse' },
      { src: '/new.svg', alt: 'New', href: '/', classes: 'logo', summary: 'New summary' },
      { social: [{ label: 'New', icon: { svg: 'new' }, href: '/new' }] },
      {
        webform_id: 'new-form',
        label: 'New newsletter',
        summary: 'New description',
        actionLabel: 'Subscribe',
      },
      { left: 'new-left' },
      [{ label: 'New group', child: [] }],
      [{ label: 'New mobile', child: [] }]
    );

    expect(result.params).toEqual({ mode: 'inverse', shape: true });
    expect(result.footerBrand?.logo.img).toMatchObject({
      src: '/new.svg',
      alt: 'New',
      href: '/',
      classes: 'logo',
    });
    expect(result.footerBrand?.summary).toBe('New summary');
    expect(result.footerBrand?.social).toEqual([
      { label: 'New', icon: { svg: 'new' }, href: '/new' },
    ]);
    expect(result.mainMenu?.[0].label).toBe('New group');
    expect(result.mobileMenu?.[0].label).toBe('New mobile');
    expect(result.footerNewsletter).toMatchObject({
      params: { webform_id: 'new-form' },
      label: 'New newsletter',
      summary: 'New description',
      action: { label: 'Subscribe' },
      form: [{ key: 'email' }],
    });
    expect(result.footerBottom).toEqual({
      left: 'new-left',
      right: [{ label: 'Old link', href: '/old' }],
    });
    expect(result.copyRight).toBe('keep-me');
  });
});
