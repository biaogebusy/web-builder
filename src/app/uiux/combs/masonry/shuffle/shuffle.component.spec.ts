import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ShuffleComponent } from './shuffle.component';

describe('ShuffleComponent', () => {
  let component: ShuffleComponent;
  let fixture: ComponentFixture<ShuffleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShuffleComponent],
    }).compileComponents();
  });

  const render = async (withContent = false) => {
    fixture = TestBed.createComponent(ShuffleComponent);
    component = fixture.componentInstance;
    if (withContent) {
      fixture.componentRef.setInput('content', { type: 'shuffle', elements: [] });
    }
    fixture.detectChanges();
    await fixture.whenStable();
  };

  afterEach(() => {
    fixture.destroy();
  });

  it('does not initialize a layout when optional content is absent', async () => {
    await render();
    await new Promise(resolve => setTimeout(resolve, 550));
    expect(component).toBeTruthy();
    expect(component.shuffle).toBeUndefined();
  });

  it('cancels delayed initialization when the view is destroyed', async () => {
    await render(true);
    fixture.destroy();
    await new Promise(resolve => setTimeout(resolve, 550));
    expect(component.shuffle).toBeUndefined();
  });

  it('initializes the rendered grid and releases its layout on destroy', async () => {
    await render(true);
    expect(() => component.onChange({ value: 'news' })).not.toThrow();
    await vi.waitFor(() => expect(component.shuffle).toBeDefined());
    const layout = component.shuffle!;
    expect(layout.element).toBe(fixture.nativeElement.querySelector('.shuffle-inner'));
    const filter = vi.spyOn(layout, 'filter');
    const destroy = vi.spyOn(layout, 'destroy');
    component.onChange({ value: 'news' });
    expect(filter).toHaveBeenCalledWith('news');
    fixture.destroy();
    expect(destroy).toHaveBeenCalledOnce();
  });
});
