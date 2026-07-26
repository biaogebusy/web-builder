import { formatServerTiming, resolveRequestId } from './request-timing';

describe('SSR request timing', () => {
  it('keeps a valid proxy request id', () => {
    expect(resolveRequestId('request-123', () => 'generated')).toBe('request-123');
  });

  it('replaces invalid request ids', () => {
    expect(resolveRequestId('invalid request id', () => 'generated')).toBe('generated');
    expect(resolveRequestId(undefined, () => 'generated')).toBe('generated');
  });

  it('formats durations and descriptions for Server-Timing', () => {
    expect(
      formatServerTiming([
        {
          name: 'node-before-ssr',
          durationMs: 12.345,
          description: 'Node middleware',
        },
        { name: 'ssr-cache', description: 'MISS' },
      ])
    ).toBe('node-before-ssr;dur=12.35;desc="Node middleware", ssr-cache;desc="MISS"');
  });
});
