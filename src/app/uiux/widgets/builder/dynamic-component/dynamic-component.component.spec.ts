import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentService } from '@core/service/component.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';

import { DynamicComponentComponent } from './dynamic-component.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-old-dynamic-test',
  template: '<p class="old-component">{{ content().label }}</p>',
})
class OldDynamicTestComponent {
  readonly content = input.required<{ label: string }>();
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-new-dynamic-test',
  template: '<p class="new-component">{{ content().label }} {{ data() }} {{ legacyValue }}</p>',
})
class NewDynamicTestComponent {
  readonly content = input.required<{ label: string }>();
  readonly data = input('');
  legacyValue = '';
}

describe('DynamicComponentComponent', () => {
  let fixture: ComponentFixture<DynamicComponentComponent>;
  let resolveNewComponent: (component: typeof NewDynamicTestComponent) => void;
  let componentReady: Promise<typeof NewDynamicTestComponent>;
  let componentService: {
    getCachedComponentType: ReturnType<typeof vi.fn>;
    getComponentType: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    componentReady = new Promise(resolve => {
      resolveNewComponent = resolve;
    });
    componentService = {
      getCachedComponentType: vi.fn((type: string) => {
        return type === 'old' ? OldDynamicTestComponent : undefined;
      }),
      getComponentType: vi.fn(() => componentReady),
    };

    await TestBed.configureTestingModule({
      imports: [DynamicComponentComponent],
      providers: [
        { provide: ComponentService, useValue: componentService },
        { provide: ScreenService, useValue: { isPlatformBrowser: () => true } },
        { provide: UtilitiesService, useValue: { initAnimate: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicComponentComponent);
    fixture.componentRef.setInput('inputs', { type: 'old', label: 'Old content' });
  });

  it('renders a cached component through NgComponentOutlet without skipping hydration', async () => {
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.old-component')?.textContent).toContain('Old content');
    expect(element.hasAttribute('ngskiphydration')).toBe(false);
  });

  it('keeps the old component until the asynchronously loaded replacement is ready', async () => {
    await fixture.whenStable();

    fixture.componentRef.setInput('inputs', {
      content: { type: 'new', label: 'New content' },
      data: 'Input data',
      legacyValue: 'Legacy property',
    });
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.old-component')).not.toBeNull();
    expect(element.querySelector('.new-component')).toBeNull();

    resolveNewComponent(NewDynamicTestComponent);
    await vi.waitFor(async () => {
      await fixture.whenStable();
      expect(element.querySelector('.new-component')?.textContent).toContain(
        'New content Input data Legacy property'
      );
    });
    expect(element.querySelector('.old-component')).toBeNull();
  });

  it('ignores a stale component loader after newer cached inputs have rendered', async () => {
    await fixture.whenStable();

    fixture.componentRef.setInput('inputs', {
      content: { type: 'new', label: 'Stale content' },
    });
    await fixture.whenStable();
    fixture.componentRef.setInput('inputs', { type: 'old', label: 'Current content' });
    await fixture.whenStable();

    resolveNewComponent(NewDynamicTestComponent);
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.old-component')?.textContent).toContain('Current content');
    expect(element.querySelector('.new-component')).toBeNull();
  });
});
