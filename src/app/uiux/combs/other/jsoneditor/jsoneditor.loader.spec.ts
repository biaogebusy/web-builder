import { vi } from 'vitest';
import { JSONEDITOR_ASSETS } from './jsoneditor.assets';
import { loadJsonEditorAssets } from './jsoneditor.loader';

describe('JSONEditor assets', () => {
  it.each([true, false])('awaits styles before loading the AMD-safe script (local: %s)', async local => {
    let finishStyle!: () => void;
    const loader = {
      loadStyle: vi.fn(() => new Promise<void>(resolve => (finishStyle = resolve))),
      loadScriptWithoutAmd: vi.fn(async () => undefined),
    };
    const pending = loadJsonEditorAssets(loader, local);
    const source = JSONEDITOR_ASSETS[local ? 'local' : 'cdn'];
    expect(loader.loadStyle).toHaveBeenCalledWith(source.style);
    expect(loader.loadScriptWithoutAmd).not.toHaveBeenCalled();
    finishStyle();
    await pending;
    expect(loader.loadScriptWithoutAmd).toHaveBeenCalledWith(source.script);
  });

  it('passes loading errors to the caller without advancing to the script', async () => {
    const error = new Error('style failed');
    const loader = {
      loadStyle: vi.fn(async () => { throw error; }),
      loadScriptWithoutAmd: vi.fn(async () => undefined),
    };
    await expect(loadJsonEditorAssets(loader, true)).rejects.toBe(error);
    expect(loader.loadScriptWithoutAmd).not.toHaveBeenCalled();
  });
});
