import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { BUILDER_FULL_SCREEN } from '@core/token/token-providers';
import { ScreenService } from '@core/service/screen.service';
import { LocalStorageService } from 'ngx-webstorage';
import type { MockInstance } from 'vitest';

import { BuilderWorkspaceComponent } from './builder-workspace.component';
import { BuilderToolbarComponent } from '../../toolbar/builder-toolbar/builder-toolbar.component';
import { BuilderVersionComponent } from '../../sidebar/builder-version/builder-version.component';
import { BuilderShowcaseComponent } from '../builder-showcase/builder-showcase.component';
import { BuilderListComponent } from '../builder-list/builder-list.component';

describe('BuilderWorkspaceComponent', () => {
  let component: BuilderWorkspaceComponent;
  let fixture: ComponentFixture<BuilderWorkspaceComponent>;
  const fullWidth = signal(false);
  let stored: boolean;
  const storage = {
    retrieve: vi.fn(() => stored),
    store: vi.fn((_key: string, value: boolean) => { stored = value; }),
  };
  let listeners: MockInstance<Document['addEventListener']>;

  beforeEach(async () => {
    stored = false;
    fullWidth.set(false);
    vi.clearAllMocks();
    listeners = vi.spyOn(document, 'addEventListener');
    await TestBed.configureTestingModule({
      imports: [BuilderWorkspaceComponent],
      providers: [
        provideRouter([]), ...provideBuilderMocks(),
        { provide: BUILDER_FULL_SCREEN, useValue: fullWidth },
        { provide: LocalStorageService, useValue: storage },
      ],
    }).overrideComponent(BuilderWorkspaceComponent, {
      remove: {
        imports: [
          BuilderToolbarComponent,
          BuilderVersionComponent,
          BuilderShowcaseComponent,
          BuilderListComponent,
        ],
      },
      add: { schemas: [NO_ERRORS_SCHEMA] },
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderWorkspaceComponent);
    component = fixture.componentInstance;
    vi.spyOn(TestBed.inject(ScreenService), 'isPlatformBrowser').mockReturnValue(true);
    component.builder.fullScreen$.subscribe(value => fullWidth.set(value));
  });

  afterEach(() => {
    fixture.destroy();
    // Keep the failing baseline's leaked listeners out of the following case.
    for (const [type, listener, options] of listeners.mock.calls) {
      if (type === 'keydown') document.removeEventListener(type, listener, options);
    }
    listeners.mockRestore();
  });

  function press(target: EventTarget, init: KeyboardEventInit = {}): void {
    target.dispatchEvent(new KeyboardEvent('keydown', {
      key: 's', code: 'KeyS', bubbles: true, cancelable: true, ...init,
    }));
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('switches the editor theme without placing the page canvas inside that theme', () => {
    for (const mode of ['dark', 'light'] as const) {
      component.builder.themeMode.set(mode);
      fixture.detectChanges();

      const workspace: HTMLElement = fixture.nativeElement;
      expect(workspace.querySelector('.toolbar-host')?.classList.contains(`${mode}-theme`))
        .toBe(true);
      expect(workspace.querySelector('.sidebar')?.classList.contains(`${mode}-theme`)).toBe(true);
      expect(workspace.querySelector('.preview-content')?.closest('.light-theme, .dark-theme'))
        .toBeNull();
    }
  });

  it('toggles once from the body and drawer, persisting the visible state', () => {
    fixture.detectChanges();
    const changes = vi.spyOn(component.builder.fullScreen$, 'next');
    press(document.body);
    expect(fullWidth()).toBe(true);
    expect(stored).toBe(true);
    press(fixture.nativeElement.querySelector('mat-drawer'));
    expect(fullWidth()).toBe(false);
    expect(stored).toBe(false);
    expect(changes.mock.calls).toEqual([[true], [false]]);
    expect(storage.store.mock.calls).toEqual([
      ['builderFullScreen', true], ['builderFullScreen', false],
    ]);
  });

  it('toggles the current layout after navigation resets it but storage still says full width', () => {
    fixture.detectChanges();
    stored = true;
    press(document.body);
    expect(fullWidth()).toBe(true);
    expect(stored).toBe(true);
  });

  it('does not change layout for ordinary drawer navigation keys', () => {
    fixture.detectChanges();
    for (const code of ['Tab', 'ArrowDown', 'ArrowUp', 'Escape', 'Enter', 'Space', 'KeyA']) {
      press(fixture.nativeElement.querySelector('mat-drawer'), { code });
    }
    expect(storage.store).not.toHaveBeenCalled();
    expect(fullWidth()).toBe(false);
  });

  it.each(['body', 'mat-drawer'])('ignores modified, repeated, composing and handled keys on %s', tag => {
    fixture.detectChanges();
    const target = tag === 'body' ? document.body : fixture.nativeElement.querySelector(tag);
    for (const flag of ['ctrlKey', 'metaKey', 'altKey', 'shiftKey', 'repeat', 'isComposing']) {
      press(target, { [flag]: true });
    }
    const handled = new KeyboardEvent('keydown', { code: 'KeyS', bubbles: true, cancelable: true });
    handled.preventDefault();
    target.dispatchEvent(handled);
    expect(storage.store).not.toHaveBeenCalled();
  });

  it('leaves form controls and editable text alone', () => {
    fixture.detectChanges();
    const drawer: HTMLElement = fixture.nativeElement.querySelector('mat-drawer');
    for (const tag of ['input', 'textarea', 'div']) {
      const target = document.createElement(tag);
      if (tag === 'div') target.contentEditable = 'true';
      drawer.append(target);
      press(target);
      target.remove();
    }
    expect(storage.store).not.toHaveBeenCalled();
  });

  it('stops writing layout state after the workspace is destroyed', () => {
    fixture.detectChanges();
    fixture.destroy();
    press(document.body);
    expect(storage.store).not.toHaveBeenCalled();
    expect(fullWidth()).toBe(false);
  });

  it('keeps one active shortcut after repeated workspace reentry', () => {
    fixture.detectChanges();
    for (let visit = 0; visit < 3; visit++) {
      fixture.destroy();
      fixture = TestBed.createComponent(BuilderWorkspaceComponent);
      fixture.detectChanges();
      storage.store.mockClear();
      const before = fullWidth();
      press(document.body);
      expect(fullWidth()).toBe(!before);
      expect(storage.store).toHaveBeenCalledExactlyOnceWith('builderFullScreen', !before);
    }
  });

  it('does not register the shortcut during server rendering', () => {
    vi.mocked(TestBed.inject(ScreenService).isPlatformBrowser).mockReturnValue(false);
    fixture.detectChanges();
    press(document.body);
    expect(storage.store).not.toHaveBeenCalled();
  });
});
