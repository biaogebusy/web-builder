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
});
