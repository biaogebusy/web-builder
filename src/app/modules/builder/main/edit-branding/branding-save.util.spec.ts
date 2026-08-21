import { of } from 'rxjs';
import { vi } from 'vitest';
import type { IBranding, IFooter, IHeader } from '@core/interface/branding/IBranding';
import type { NodeService } from '@core/service/node.service';
import {
  BRANDING_ALIAS,
  BRANDING_JSON_ENDPOINT,
  buildBrandingUpdateBody,
  canSaveBranding,
  listBrandingNodes,
  pickBrandingNode,
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

  describe('listBrandingNodes / pickBrandingNode', () => {
    // List node--json entries and match by alias (filter[path.alias] 500s on some backends)
    const jsonNode = (id: string, langcode: string, alias: string) => ({
      id,
      attributes: { langcode, path: { alias } },
    });

    const nodeServiceMock = (rows: unknown[]) =>
      ({ fetch: vi.fn(() => of({ data: rows })) }) as unknown as NodeService;

    it('lists only branding-alias nodes with a sparse fieldset request', async () => {
      const service = nodeServiceMock([
        jsonNode('uuid-base', 'zh-hans', '/core/base'),
        jsonNode('uuid-zh', 'zh-hans', BRANDING_ALIAS),
        jsonNode('uuid-en', 'en', BRANDING_ALIAS),
      ]);

      await expect(listBrandingNodes(service).toPromise()).resolves.toEqual([
        { uuid: 'uuid-zh', langcode: 'zh-hans' },
        { uuid: 'uuid-en', langcode: 'en' },
      ]);
      expect(service.fetch).toHaveBeenCalledWith(BRANDING_JSON_ENDPOINT, {
        'fields[node--json]': 'langcode,path',
        'page[limit]': 50,
      });
    });

    it('picks the node matching the target langcode', () => {
      const nodes = [
        { uuid: 'uuid-zh', langcode: 'zh-hans' },
        { uuid: 'uuid-en', langcode: 'en' },
      ];

      expect(pickBrandingNode(nodes, 'en')).toEqual({ uuid: 'uuid-en', langcode: 'en' });
      expect(pickBrandingNode(nodes, 'zh-hans')).toEqual({ uuid: 'uuid-zh', langcode: 'zh-hans' });
    });

    it('falls back to the first node without a match and null when empty', () => {
      const nodes = [{ uuid: 'uuid-zh', langcode: 'zh-hans' }];

      expect(pickBrandingNode(nodes, 'en')).toEqual({ uuid: 'uuid-zh', langcode: 'zh-hans' });
      expect(pickBrandingNode(nodes, undefined)).toEqual({ uuid: 'uuid-zh', langcode: 'zh-hans' });
      expect(pickBrandingNode([], 'en')).toBeNull();
    });
  });
});
