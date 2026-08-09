import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { vi } from 'vitest';

import { BuilderState } from '@core/state/BuilderState';
import { InlineEditorService } from '@modules/builder/inline-editor/inline-editor.service';
import { provideCoreMocks } from '@core/testing/mocks';

import { ContenteditDirective } from './contentedit.directive';

const { activateMock } = vi.hoisted(() => ({ activateMock: vi.fn() }));

// rich 分支动态 import 该模块;mock 掉避免真实拉起 tiptap
vi.mock('@modules/builder/inline-editor/inline-editor.service', () => ({
  InlineEditorService: class {},
}));

@Component({
  template: `
    <div class="component-item">
      <div class="rich" contentedit="body" contenteditProfile="rich">
        <p>rich body</p>
      </div>
      <h2 class="inline" contentedit="title" contenteditProfile="inline">title</h2>
      <span class="plain" contentedit="label">label</span>
    </div>
  `,
  imports: [ContenteditDirective],
})
class HostComponent {}

/** 等待 rich 分支的动态 import 完成 */
const flushDynamicImport = (): Promise<void> => new Promise(resolve => setTimeout(resolve));

describe('ContenteditDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let builderMock: {
    rightContent$: Subject<unknown>;
    updatePageContentByPath: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    activateMock.mockClear();
    builderMock = {
      rightContent$: new Subject(),
      updatePageContentByPath: vi.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        ...provideCoreMocks(),
        { provide: BuilderState, useValue: builderMock },
        { provide: InlineEditorService, useValue: { activate: activateMock } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('rich:点击不进入裸 contenteditable,交给 InlineEditorService', async () => {
    const rich = fixture.nativeElement.querySelector('.rich') as HTMLElement;

    rich.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 12, clientY: 34 }));
    await vi.waitFor(() => expect(activateMock).toHaveBeenCalledTimes(1));

    expect(rich.contentEditable).not.toBe('true');
    const options = activateMock.mock.calls[0][0];
    expect(options.element).toBe(rich);
    expect(options.path).toBe('body');
    expect(options.profile).toBe('rich');
    expect(options.clickCoords).toEqual({ x: 12, y: 34 });
  });

  it('inline:透传单行档给 InlineEditorService', async () => {
    const inline = fixture.nativeElement.querySelector('.inline') as HTMLElement;

    inline.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await vi.waitFor(() => expect(activateMock).toHaveBeenCalledTimes(1));

    expect(inline.contentEditable).not.toBe('true');
    const options = activateMock.mock.calls[0][0];
    expect(options.path).toBe('title');
    expect(options.profile).toBe('inline');
  });

  it('rich:不打开右侧文本面板(该面板会改写元素 DOM,与原位编辑器互斥)', async () => {
    const emissions: unknown[] = [];
    builderMock.rightContent$.subscribe(content => emissions.push(content));
    const rich = fixture.nativeElement.querySelector('.rich') as HTMLElement;

    rich.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await vi.waitFor(() => expect(activateMock).toHaveBeenCalled());
    await flushDynamicImport();

    expect(emissions.length).toBe(0);
    const options = activateMock.mock.calls[0][0];
    expect(options.onActivated).toBeUndefined();
    expect(options.onCommitted).toBeUndefined();
  });

  it('plain:兜底裸 contenteditable,不再打开旧文本面板', async () => {
    const emissions: unknown[] = [];
    builderMock.rightContent$.subscribe(content => emissions.push(content));
    const plain = fixture.nativeElement.querySelector('.plain') as HTMLElement;

    plain.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushDynamicImport();
    await flushDynamicImport();

    expect(plain.contentEditable).toBe('true');
    expect(activateMock).not.toHaveBeenCalled();
    expect(emissions.length).toBe(0);
  });
});
