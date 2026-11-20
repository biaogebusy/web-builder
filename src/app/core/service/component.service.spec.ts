import { TestBed } from '@angular/core/testing';
import { ComponentService } from './component.service';

describe('ComponentService', () => {
  let service: ComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentService);
    service.registerDynamicComponent();
  });

  it('loads a standalone component directly', async () => {
    const componentType = await service.getComponentType('bg');

    expect(componentType.name).toBe('BgComponent');
  });

  it.each([
    ['banner-simple', 'BannerSimpleComponent'],
    ['layout-builder', 'LayoutBuilderComponent'],
    ['custom-template', 'CustomTemplateComponent'],
  ])('loads the public page component %s', async (type, expectedName) => {
    const componentType = await service.getComponentType(type);

    expect(componentType.name).toBe(expectedName);
  });

  it('returns the cached component type for repeated requests', async () => {
    const [first, second] = await Promise.all([
      service.getComponentType('icon'),
      service.getComponentType('icon'),
    ]);

    expect(first).toBe(second);
  });

  it('reports an unknown component type', async () => {
    await expect(service.getComponentType('unknown-component')).rejects.toThrow(
      'No component loader found for "unknown-component"'
    );
  });
  it('ignores editor metadata while preloading real nested components', async () => {
    class PreloadedComponent {}
    const load = vi.spyOn(service, 'getComponentType').mockResolvedValue(PreloadedComponent);
    await service.preloadComponentTypes({
      body: [{
        type: 'layout-builder',
        extra: { type: 'json', content: { type: 'page-setting' } },
        elements: [{
          elements: [{ type: 'text', extra: { type: 'json' } }],
          content: { type: 'img' },
        }],
      }],
    });
    expect(load.mock.calls.map(([type]) => type)).toEqual(['layout-builder', 'text', 'img']);
  });

  it('still preloads actual JSON fields and deduplicates cyclic/shared descriptors', async () => {
    class PreloadedComponent {}
    const load = vi.spyOn(service, 'getComponentType').mockResolvedValue(PreloadedComponent);
    const field = { type: 'json' };
    const content: Record<string, unknown> = { body: [field, field], content: { type: 'text' } };
    content['self'] = content;
    await service.preloadComponentTypes(content);
    expect(load.mock.calls.map(([type]) => type)).toEqual(['json', 'text']);
  });

  it('loads the JSON field explicitly after ignoring its metadata lookalike', async () => {
    await service.preloadComponentTypes({ extra: { type: 'json' } });
    expect(service.getCachedComponentType('json')).toBeUndefined();
    const componentType = await service.getComponentType('json');
    expect(componentType.name).toBe('JsonFieldType');
    expect(service.getCachedComponentType('json')).toBe(componentType);
  });

});
