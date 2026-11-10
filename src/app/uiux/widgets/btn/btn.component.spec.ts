import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
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
