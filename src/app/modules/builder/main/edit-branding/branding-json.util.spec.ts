import { formatBrandingJson, getBrandingJsonError, mergeBrandingJson } from './branding-json.util';

describe('branding JSON utilities', () => {
  it('formats configs with the editor preview indentation', () => {
    expect(formatBrandingJson({ header: { enabled: true } })).toBe(
      '{\n  "header": {\n    "enabled": true\n  }\n}'
    );
  });

  it('returns an empty error for valid JSON and the parser message otherwise', () => {
    expect(getBrandingJsonError('{"enabled":true}')).toBe('');

    const error = getBrandingJsonError('{"enabled":');
    expect(error).toBeTruthy();
  });

  it('deep-merges an object override without mutating the base config', () => {
    const base = {
      params: { mode: 'light', shape: true },
      links: [{ label: 'Home', href: '/' }],
    };

    const merged = mergeBrandingJson(base, '{"params":{"mode":"inverse"}}');

    expect(merged).toEqual({
      params: { mode: 'inverse', shape: true },
      links: [{ label: 'Home', href: '/' }],
    });
    expect(merged).not.toBe(base);
    expect(base.params.mode).toBe('light');
  });

  it('keeps the original config for non-object JSON and propagates parse errors', () => {
    const base = { enabled: true };

    expect(mergeBrandingJson(base, 'null')).toBe(base);
    expect(mergeBrandingJson(base, 'false')).toBe(base);
    expect(() => mergeBrandingJson(base, '{')).toThrow();
  });
});
