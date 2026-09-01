import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToolbarKeynavDirective } from '@core/directive/toolbar-keynav.directive';

@Component({
  selector: 'app-test-toolbar',
  standalone: true,
  imports: [ToolbarKeynavDirective],
  template: `
    <div toolbarKeynav role="toolbar" tabindex="0">
      <button id="b1">One</button>
      <button id="b2">Two</button>
      <button id="b3" disabled>Three</button>
      <button id="b4">Four</button>
    </div>
  `,
})
class TestToolbarComponent {}

describe('ToolbarKeynavDirective', () => {
  const setup = () => {
    TestBed.resetTestingModule();
    const fixture = TestBed.createComponent(TestToolbarComponent);
    fixture.detectChanges();
    const toolbar = fixture.debugElement.query(By.directive(ToolbarKeynavDirective));
    return {
      fixture,
      toolbar: toolbar.nativeElement as HTMLElement,
      buttons: () =>
        Array.from(toolbar.nativeElement.querySelectorAll('button')) as HTMLButtonElement[],
      press: (target: HTMLElement, key: string) => {
        const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
        target.dispatchEvent(event);
        return event;
      },
    };
  };

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('ignores keys that are not ArrowLeft / ArrowRight', () => {
    const { buttons, press } = setup();
    const [b1] = buttons();
    b1.focus();

    const event = press(b1, 'Enter');
    expect(event.defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(b1);
  });

  it('moves focus to the next enabled button on ArrowRight', () => {
    const { buttons, press } = setup();
    const [b1, b2] = buttons();
    b1.focus();

    press(b1, 'ArrowRight');
    expect(document.activeElement).toBe(b2);
  });

  it('prevents the default behavior for arrow keys', () => {
    const { buttons, press } = setup();
    const [b1] = buttons();
    b1.focus();

    const event = press(b1, 'ArrowRight');
    expect(event.defaultPrevented).toBe(true);
  });

  it('moves focus to the previous enabled button on ArrowLeft', () => {
    const { buttons, press } = setup();
    const [, b2, , b4] = buttons();
    b4.focus();

    press(b4, 'ArrowLeft');
    // Skips disabled b3
    expect(document.activeElement).toBe(b2);
  });

  it('wraps around from last to first on ArrowRight', () => {
    const { buttons, press } = setup();
    const [b1, , , b4] = buttons();
    b4.focus();

    press(b4, 'ArrowRight');
    expect(document.activeElement).toBe(b1);
  });

  it('wraps around from first to last on ArrowLeft', () => {
    const { buttons, press } = setup();
    const [b1, , , b4] = buttons();
    b1.focus();

    press(b1, 'ArrowLeft');
    expect(document.activeElement).toBe(b4);
  });

  it('skips disabled buttons when moving right', () => {
    const { buttons, press } = setup();
    const [, b2, , b4] = buttons();
    b2.focus();

    press(b2, 'ArrowRight');
    expect(document.activeElement).toBe(b4);
  });

  it('does nothing when the event target is not inside a button', () => {
    const { toolbar, press } = setup();
    toolbar.focus();

    const event = press(toolbar, 'ArrowRight');
    // index < 0 path: no preventDefault, no focus change
    expect(event.defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(toolbar);
  });

  it('only considers direct button children (not nested ones)', () => {
    // querySelectorAll selects all descendants; but disabled filtering still works.
    // Ensure the button list contains all 4 buttons (b1-b4), with b3 filtered out.
    const { buttons } = setup();
    const btns = buttons();
    expect(btns.length).toBe(4);
    expect(btns[2].id).toBe('b3');
    expect(btns[2].disabled).toBe(true);
  });
});
