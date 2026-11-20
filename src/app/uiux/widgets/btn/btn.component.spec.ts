import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CONTENT_EDITOR } from '@core/token/content-editor.token';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { BtnComponent } from './btn.component';

describe('BtnComponent', () => {
  let component: BtnComponent;
  let fixture: ComponentFixture<BtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each(['text', 'raised', 'stroked', 'flat', 'icon', 'fab', 'mini-fab'])(
    'keeps an ordinary %s button free of menu semantics and duplicate clicks',
    mode => {
      fixture.componentRef.setInput('content', {
        mode,
        label: 'Ordinary action',
        icon: { svg: 'send' },
      });
      const clicked = vi.fn();
      component.btnClick.subscribe(clicked);
      fixture.detectChanges();
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      for (const attribute of ['aria-haspopup', 'aria-expanded', 'aria-controls']) {
        expect(button.hasAttribute(attribute)).toBe(false);
      }
      button.click();
      expect(clicked).toHaveBeenCalledTimes(1);
    }
  );

  it.each(['fab', 'mini-fab'])('prevents activation of a disabled %s button', mode => {
    fixture.componentRef.setInput('content', {
      mode,
      label: 'Disabled action',
      icon: { svg: 'send' },
      disabled: true,
    });
    const clicked = vi.fn();
    component.btnClick.subscribe(clicked);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
    button.click();
    expect(clicked).not.toHaveBeenCalled();
  });

  it('should use explicit ariaLabel on fab button', () => {
    fixture.componentRef.setInput('content', {
      mode: 'fab',
      icon: { svg: 'send' },
      ariaLabel: '提交',
    });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('提交');
  });

  it('should fall back to icon name when fab button has no ariaLabel', () => {
    fixture.componentRef.setInput('content', {
      mode: 'fab',
      icon: { svg: 'send' },
    });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('send');
  });

  it('should fall back to stripped label before icon name', () => {
    fixture.componentRef.setInput('content', {
      mode: 'mini-fab',
      icon: { svg: 'pencil' },
      label: '<span>编辑</span>',
    });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('编辑');
  });

  it('should fall back to icon name on icon-mode button', () => {
    fixture.componentRef.setInput('content', {
      mode: 'icon',
      icon: { name: 'close' },
    });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('close');
  });

  it('should give raised link a discernible name when label is empty', () => {
    fixture.componentRef.setInput('content', {
      mode: 'raised',
      href: '/path',
      icon: { svg: 'arrow_forward' },
    });
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a');
    expect(link.getAttribute('aria-label')).toBe('arrow_forward');
  });

  it('should use explicit ariaLabel on raised link', () => {
    fixture.componentRef.setInput('content', {
      mode: 'raised',
      href: '/path',
      label: '',
      ariaLabel: '了解更多',
    });
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a');
    expect(link.getAttribute('aria-label')).toBe('了解更多');
  });

  it('should mirror the stripped label on raised link', () => {
    fixture.componentRef.setInput('content', {
      mode: 'raised',
      href: '/path',
      label: '<b>立即</b>购买',
    });
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a');
    expect(link.getAttribute('aria-label')).toBe('立即 购买');
  });
});

describe('BtnComponent empty label in the builder', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [BtnComponent],
    providers: [
      provideRouter([]), ...provideUiuxMocks(),
      { provide: CONTENT_EDITOR, useValue: { updatePageContentByPath: vi.fn() } },
    ],
  }));

  for (const mode of ['text', 'raised', 'stroked', 'flat']) {
    it.each(['', '/destination'])('restores the %s link on a ' + mode + ' label edit', href => {
      const fixture = TestBed.createComponent(BtnComponent);
      fixture.nativeElement.classList.add('component-item');
      const content = { mode, href, label: '', icon: { svg: 'send' } };
      fixture.componentRef.setInput('content', content);
      fixture.detectChanges();
      const target = fixture.nativeElement.querySelector('[data-path="label"]');
      expect(target.getAttribute('role')).toBe('button');
      expect(target.tabIndex).toBe(0);
      expect(target.getAttribute('aria-label')).toBe('BUILDER.INLINE_EDITOR.EDIT_BUTTON_LABEL');
      expect(target.innerHTML).toBe('');
      expect(target.closest('button, a')).toBeNull();
      expect(fixture.nativeElement.querySelector('button, a')).toBeNull();
      expect(fixture.nativeElement.querySelector('app-icon')).toBeTruthy();
      expect(content.label).toBe('');

      fixture.componentRef.setInput('content', { ...content, label: '<em>Recovered</em>' });
      fixture.detectChanges();
      const native = fixture.nativeElement.querySelector(href ? 'a' : 'button');
      expect(native.textContent).toContain('Recovered');
      if (href) expect(native.getAttribute('href')).toBe(href);
      expect(fixture.nativeElement.querySelector('[data-contentedit-placeholder]')).toBeNull();
    });
  }

  it.each(['icon', 'fab', 'mini-fab'])('retains an empty label in %s mode', mode => {
    const fixture = TestBed.createComponent(BtnComponent);
    fixture.nativeElement.classList.add('component-item');
    fixture.componentRef.setInput('content', { mode, label: '', icon: { svg: 'send' } });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-contentedit-placeholder]')).toBeNull();
  });

  it('keeps a disabled text button disabled', () => {
    const fixture = TestBed.createComponent(BtnComponent);
    fixture.nativeElement.classList.add('component-item');
    fixture.componentRef.setInput('content', { mode: 'raised', label: '', disabled: true });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
    expect(fixture.nativeElement.querySelector('[data-contentedit-placeholder]')).toBeNull();
  });

  it('does not add an editing entry to a preview outside the canvas', () => {
    const fixture = TestBed.createComponent(BtnComponent);
    fixture.componentRef.setInput('content', { mode: 'raised', label: '', href: '/destination' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe('/destination');
    expect(fixture.nativeElement.querySelector('[data-contentedit-placeholder]')).toBeNull();
  });
});
