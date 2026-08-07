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

  it('builds the header top banner and drops it when emptied', () => {
    const header: IHeader = {
      params: { themeSwitch: true, userInfo: true, menuHoverOpen: true },
      mainMenu: [],
      search: {} as IHeader['search'],
      actions: [],
      top: {
        banner: {
          left: [{ icon: { svg: 'old-icon', inline: true }, label: 'v1.0' }],
          right: [{ label: 'zhihu', svg: 'zhihu', href: '/zhihu' }],
        },
      },
    };
    const logoValue = { label: '', href: '/', version: false, src: '', width: 0, height: 0 };

    const withTop = buildHeaderConfig(header, {}, logoValue, [], {}, {}, {
      left: [
        { svg: 'check', label: 'v2.0' },
        { svg: '', label: '' },
      ],
      right: [{ label: 'weibo', svg: 'weibo', href: '/weibo' }],
    });
    expect(withTop.top?.banner).toEqual({
      left: [{ icon: { svg: 'check', inline: true }, label: 'v2.0' }],
      right: [{ label: 'weibo', svg: 'weibo', href: '/weibo' }],
    });

    const emptied = buildHeaderConfig(header, {}, logoValue, [], {}, {}, { left: [], right: [] });
    expect(emptied.top).toBeUndefined();
  });

  it('does not inject empty newsletter or bottom-left into configs without them', () => {
    const footer: IFooter = {
      params: { mode: 'inverse' },
      footerBottom: { right: [{ label: 'Home', href: '/' }] },
    };

    const result = buildFooterConfig(
      footer,
      {},
      { src: '', summary: '' },
      {},
      { webform_id: '', label: '', summary: '', actionLabel: '' },
      { left: '' },
      [],
      []
    );

    expect(result.footerNewsletter).toBeUndefined();
    expect('footerNewsletter' in result).toBe(false);
    expect(result.footerBottom).toEqual({ right: [{ label: 'Home', href: '/' }] });
    expect(result.footerBottom && 'left' in result.footerBottom).toBe(false);
  });

  it('keeps the newsletter when the user fills it in', () => {
    const footer: IFooter = { params: { mode: 'light' } };

    const result = buildFooterConfig(
      footer,
      {},
      { src: '' },
      {},
      { webform_id: 'subscribe', label: '资讯', summary: '', actionLabel: '订阅' },
      { left: '' },
      [],
      []
    );

    expect(result.footerNewsletter).toMatchObject({
      params: { webform_id: 'subscribe' },
      label: '资讯',
      action: { label: '订阅' },
    });
  });

  it('builds fixBar and the dynamic custom block', () => {
    const footer: IFooter = {
      params: { mode: 'inverse' },
      dynamic: {
        classes: 'old-classes',
        content: { type: 'custom-template', fullWidth: false, isAPI: false, html: '<p>old</p>' },
      },
    };

    const result = buildFooterConfig(
      footer,
      {},
      { src: '' },
      {},
      { webform_id: '', label: '', summary: '', actionLabel: '' },
      { left: '' },
      [],
      [],
      {
        fixBar: [
          { type: 'link', id: 'contact', label: 'Contact', href: '/contact', target: '_self', icon: { svg: 'email-outline' } },
        ],
      },
      { enabled: true, classes: 'md:flex-3/12', html: '<p>new</p>' }
    );

    expect(result.fixBar).toEqual([
      { type: 'link', id: 'contact', label: 'Contact', href: '/contact', target: '_self', icon: { svg: 'email-outline' } },
    ]);
    expect(result.dynamic).toEqual({
      classes: 'md:flex-3/12',
      content: { type: 'custom-template', fullWidth: false, isAPI: false, html: '<p>new</p>' },
    });

    const removed = buildFooterConfig(
      footer,
      {},
      { src: '' },
      {},
      { webform_id: '', label: '', summary: '', actionLabel: '' },
      { left: '' },
      [],
      [],
      { fixBar: [] },
      { enabled: false, classes: '', html: '' }
    );
    expect(removed.dynamic).toBeUndefined();
    expect(removed.fixBar).toBeUndefined();
  });
});
