import { signal } from '@angular/core';
import { Subject } from 'rxjs';
import { vi } from 'vitest';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { EditFooterComponent } from './edit-footer/edit-footer.component';

describe.each([EditHeaderComponent, EditFooterComponent])('%s language switching', Editor => {
  function editor(dirty = true) {
    const result = new Subject<boolean | undefined>();
    let destroy: () => void = () => undefined;
    const scope = {
      nodeLangcode: signal('zh-hans'),
      dirty: signal(dirty),
      navigateToLang: vi.fn(),
      dialog: { open: vi.fn(() => ({ afterClosed: () => result })) },
      translate: { instant: (key: string) => key },
      destroyRef: {
        onDestroy: (callback: () => void) => {
          destroy = callback;
          return () => undefined;
        },
      },
    };
    return {
      scope,
      result,
      switchLang: (lang: string) => Reflect.apply(Editor.prototype.switchLang, scope, [lang]),
      destroy: () => destroy(),
    };
  }

  it('keeps the current language and navigates a clean draft without confirmation', () => {
    const { scope, switchLang } = editor(false);
    switchLang('zh-hans');
    expect(scope.navigateToLang).not.toHaveBeenCalled();
    switchLang('en');
    expect(scope.navigateToLang).toHaveBeenCalledExactlyOnceWith('en');
    expect(scope.dialog.open).not.toHaveBeenCalled();
  });

  it.each([false, undefined])('retains a dirty draft after cancellation (%s)', answer => {
    const { scope, result, switchLang } = editor();
    switchLang('en');
    result.next(answer);
    expect(scope.dirty()).toBe(true);
    expect(scope.navigateToLang).not.toHaveBeenCalled();
  });

  it('discards only the confirmed draft and leaves another editor independent', () => {
    const first = editor();
    const second = editor();
    first.switchLang('en');
    expect(first.scope.dirty()).toBe(true);
    first.result.next(true);
    expect(first.scope.dirty()).toBe(false);
    expect(first.scope.navigateToLang).toHaveBeenCalledExactlyOnceWith('en');
    expect(second.scope.dirty()).toBe(true);
    expect(second.scope.navigateToLang).not.toHaveBeenCalled();
  });

  it('ignores a dialog result after the editor is destroyed', () => {
    const { scope, result, switchLang, destroy } = editor();
    switchLang('en');
    destroy();
    result.next(true);
    expect(scope.dirty()).toBe(true);
    expect(scope.navigateToLang).not.toHaveBeenCalled();
  });
});
