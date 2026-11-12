import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CONTENT_EDITOR } from '@core/token/content-editor.token';
import { provideTranslateService } from '@ngx-translate/core';
import { vi } from 'vitest';

import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleComponent],
      providers: [provideTranslateService()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('preserves public heading markup without an empty edit target', () => {
    fixture.componentRef.setInput('content', { style: 'none', label: '' });
    fixture.detectChanges();
    const heading = fixture.nativeElement.querySelector('h2');
    expect(heading.innerHTML).toBe('');
    expect(heading.hasAttribute('role')).toBe(false);
    expect(heading.hasAttribute('tabindex')).toBe(false);
    expect(heading.hasAttribute('data-contentedit-placeholder')).toBe(false);
  });
});

describe('TitleComponent in the builder', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [TitleComponent],
    providers: [
      provideTranslateService(),
      { provide: CONTENT_EDITOR, useValue: { updatePageContentByPath: vi.fn() } },
    ],
  }));

  it('replaces an empty heading with an action and restores heading markup after editing', () => {
    const fixture = TestBed.createComponent(TitleComponent);
    fixture.nativeElement.classList.add('component-item');
    for (const style of ['none', 'style-v1', 'style-v4']) {
      fixture.componentRef.setInput('content', { style, label: '' });
      fixture.detectChanges();
      const target = fixture.nativeElement.querySelector('[data-path="label"]');
      expect(target.getAttribute('role')).toBe('button');
      expect(target.tabIndex).toBe(0);
      expect(target.innerHTML).toBe('');
      expect(fixture.nativeElement.querySelector('h2')).toBeNull();
      expect(fixture.nativeElement.querySelector('.title').classList.contains(style)).toBe(true);
      fixture.componentRef.setInput('content', { style, label: '<em>Restored</em>' });
      fixture.detectChanges();
      const heading = fixture.nativeElement.querySelector('h2');
      expect(heading.innerHTML).toBe('<em>Restored</em>');
      expect(heading.hasAttribute('role')).toBe(false);
      expect(fixture.nativeElement.querySelector('[role="button"]')).toBeNull();
    }
  });

  it('does not create a canvas action in previews outside the component canvas', () => {
    const fixture = TestBed.createComponent(TitleComponent);
    fixture.componentRef.setInput('content', { style: 'none', label: '' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[role="button"]')).toBeNull();
  });
});
