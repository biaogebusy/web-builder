import { Injector } from '@angular/core';
import { buildCustomTemplateDialogConfig } from './custom-template-dialog';
import { buildMediaDialogConfig } from './media-dialog';

describe('dialog configuration', () => {
  it('keeps a single template wrapped and array content unwrapped', () => {
    const content = { type: 'text', body: 'Preview' };
    const single = buildCustomTemplateDialogConfig({ key: 'preview', content });
    const list = [content];
    const multiple = buildCustomTemplateDialogConfig({ key: 'preview', content: list });

    expect(single.data.inputData).toEqual({ content });
    expect(multiple.data.inputData).toBe(list);
    expect(single.panelClass).toEqual(['close-outside', 'dialog-p-0']);
  });

  it('preserves explicit size overrides and splits string panel classes', () => {
    const config = buildCustomTemplateDialogConfig({
      key: 'preview', content: {},
      params: { width: '', height: '70vh', panelClass: '  dialog-p-0\ncustom  ' },
    });

    expect(config.width).toBe('');
    expect(config.height).toBe('70vh');
    expect(config.panelClass).toEqual(['dialog-p-0', 'custom']);
  });

  it('preserves an explicit empty panel class array', () => {
    const panelClass: string[] = [];
    expect(buildCustomTemplateDialogConfig({
      key: 'preview', content: {}, params: { panelClass },
    }).panelClass).toBe(panelClass);
  });

  it.each(['web-image', 'image-media', 'raster-image'] as const)(
    'retains %s selection, its correlation token and click-site injector', purpose => {
      const time = new Date();
      const injector = Injector.create({ providers: [] });
      const config = buildMediaDialogConfig({ purpose, time }, {
        width: '85vw', id: 'img-picker', panelClass: ['media'], injector,
      });

      expect(config.data?.inputData.content).toEqual({
        type: 'manage-media', fullWidth: true, purpose, time,
      });
      expect(config.data?.inputData.content.time).toBe(time);
      expect(config.injector).toBe(injector);
      expect(config.id).toBe('img-picker');
      expect(config.width).toBe('85vw');
    }
  );

  it('keeps management distinct and creates separate dialog data', () => {
    const management = buildMediaDialogConfig({ mode: 'manage' }, { width: '85vw' });
    const selection = buildMediaDialogConfig({ purpose: 'web-image' }, { width: '100%' });

    expect(management.data?.inputData.content).toEqual({
      type: 'manage-media', fullWidth: true, mode: 'manage',
    });
    expect(selection.data).not.toBe(management.data);
    expect(selection.width).toBe('100%');
  });
});
