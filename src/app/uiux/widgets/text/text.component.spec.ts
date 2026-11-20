import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CONTENT_EDITOR } from '@core/token/content-editor.token';
import { provideTranslateService } from '@ngx-translate/core';
import { vi } from 'vitest';

import { TextComponent } from './text.component';

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextComponent],
      providers: [provideTranslateService()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps empty public bodies absent', () => {
    fixture.componentRef.setInput('content', { type: 'text', body: '' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.text-body')).toBeNull();
  });
});

describe('TextComponent in the builder', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [TextComponent],
    providers: [
      provideTranslateService(),
      { provide: CONTENT_EDITOR, useValue: { updatePageContentByPath: vi.fn() } },
    ],
  }));

  it('retains the same body host when cleared and filled again in the canvas', () => {
    const fixture = TestBed.createComponent(TextComponent);
    fixture.nativeElement.classList.add('component-item');
    fixture.componentRef.setInput('content', { type: 'text', body: '<p>Original</p>' });
    fixture.detectChanges();
    const body = fixture.nativeElement.querySelector('.text-body');
    fixture.componentRef.setInput('content', { type: 'text', body: '' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.text-body')).toBe(body);
    expect(body.innerHTML).toBe('');
    expect(body.getAttribute('role')).toBe('button');
    fixture.componentRef.setInput('content', { type: 'text', body: '<p>Restored</p>' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.text-body')).toBe(body);
    expect(body.innerHTML).toBe('<p>Restored</p>');
    expect(body.hasAttribute('role')).toBe(false);
  });

  it('does not add a body to title-only or action-only canvas components', () => {
    const fixture = TestBed.createComponent(TextComponent);
    fixture.nativeElement.classList.add('component-item');
    for (const content of [
      { type: 'text', title: { label: 'Title' } },
      { type: 'text', actions: [{ type: 'closeDialog', label: 'Close' }] },
    ]) {
      fixture.componentRef.setInput('content', content);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.text-body')).toBeNull();
    }
  });

  it('keeps empty bodies absent outside the canvas even with the editor provider', () => {
    const fixture = TestBed.createComponent(TextComponent);
    fixture.componentRef.setInput('content', { type: 'text', body: '' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.text-body')).toBeNull();
  });
});
