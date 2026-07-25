import type { IBranding, IFooter, IHeader } from '@core/interface/branding/IBranding';
import {
  BRANDING_JSON_ENDPOINT,
  buildBrandingUpdateBody,
  canSaveBranding,
} from './branding-save.util';

describe('branding save utilities', () => {
  it('allows saving only for a dirty, loaded, idle editor with config', () => {
    expect(canSaveBranding(true, false, false, true)).toBe(true);
    expect(canSaveBranding(false, false, false, true)).toBe(false);
    expect(canSaveBranding(true, true, false, true)).toBe(false);
    expect(canSaveBranding(true, false, true, true)).toBe(false);
    expect(canSaveBranding(true, false, false, false)).toBe(false);
  });

  it('builds the header request body without mutating the branding object', () => {
    const header = {
      params: { themeSwitch: false, userInfo: true, menuHoverOpen: false },
      mainMenu: [],
      search: { enable: false, placeholder: '', tooltip: '', link: '', type: '', key: '' },
      actions: [],
    } as IHeader;
    const footer = { params: { mode: 'light' } } as IFooter;
    const branding: IBranding = { header, footer };
    const updatedHeader = { ...header, params: { ...header.params, themeSwitch: true } };

    const payload = buildBrandingUpdateBody(branding, 'header', updatedHeader);

    expect(JSON.parse(payload.body)).toEqual({
      header: updatedHeader,
      footer,
    });
    expect(branding.header).toBe(header);
    expect(payload.body).toBe(JSON.stringify({ ...branding, header: updatedHeader }));
    expect(BRANDING_JSON_ENDPOINT).toBe('/api/v1/node/json');
  });

  it('builds the footer request body and preserves unrelated branding fields', () => {
    const header = {
      params: { themeSwitch: false, userInfo: true, menuHoverOpen: false },
      mainMenu: [],
      search: { enable: false, placeholder: '', tooltip: '', link: '', type: '', key: '' },
      actions: [],
    } as IHeader;
    const footer = { params: { mode: 'light' } } as IFooter;
    const branding: IBranding = { header, footer };
    const updatedFooter = { ...footer, params: { mode: 'inverse' } } as IFooter;

    const payload = buildBrandingUpdateBody(branding, 'footer', updatedFooter);

    expect(JSON.parse(payload.body)).toEqual({ header, footer: updatedFooter });
  });
});
