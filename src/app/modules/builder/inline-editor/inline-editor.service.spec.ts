import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BuilderState } from '@core/state/BuilderState';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { vi } from 'vitest';

import { InlineEditorService } from './inline-editor.service';

/** 排空 queueMicrotask 推迟的提交/取消 */
const flushMicrotasks = (): Promise<void> => new Promise(resolve => setTimeout(resolve));

describe('InlineEditorService', () => {
  let service: InlineEditorService;
  let builderMock: { updatePageContentByPath: ReturnType<typeof vi.fn> };
  let host: HTMLElement;

  beforeEach(() => {
    builderMock = { updatePageContentByPath: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: BuilderState, useValue: builderMock },
      ],
    });
    service = TestBed.inject(InlineEditorService);
    host = document.createElement('div');
    host.innerHTML = '<p>hello</p>';
    document.body.appendChild(host);
  });

  afterEach(() => {
    service.cancel();
    host.remove();
  });

  it('原位挂载 tiptap 并读入原内容', () => {
    const onActivated = vi.fn();

    service.activate({ element: host, path: '0.body', onActivated });

    expect(host.querySelector('.ProseMirror.inline-tiptap')).toBeTruthy();
    expect(service.activeEditor?.getHTML()).toBe('<p>hello</p>');
    expect(service.isActive(host)).toBe(true);
    expect(onActivated).toHaveBeenCalled();
  });

  it('未修改提交:不写回并恢复原始 HTML,schema 归一化差异不算修改', () => {
    // 裸文本经 tiptap 归一化为 <p>bare</p>,基线若比对原始串会产生伪写回
    host.innerHTML = 'bare';
    service.activate({ element: host, path: '0.body' });

    service.commit();

    expect(builderMock.updatePageContentByPath).not.toHaveBeenCalled();
    expect(host.innerHTML).toBe('bare');
    expect(service.activeEditor).toBeNull();
  });

  it('修改后提交:按路径写回并调用 onCommitted', () => {
    const onCommitted = vi.fn();
    service.activate({ element: host, path: '0.body', onCommitted });
    service.activeEditor!.commands.setContent('<p>world</p>');

    service.commit();

    expect(builderMock.updatePageContentByPath).toHaveBeenCalledWith('0.body', '<p>world</p>');
    expect(onCommitted).toHaveBeenCalledWith('<p>world</p>');
    expect(host.innerHTML).toBe('<p>world</p>');
  });

  it('清空内容按空字符串写回', () => {
    service.activate({ element: host, path: '0.body' });
    service.activeEditor!.commands.clearContent(true);

    service.commit();

    expect(builderMock.updatePageContentByPath).toHaveBeenCalledWith('0.body', '');
  });

  it('取消:恢复原内容且不写回', () => {
    service.activate({ element: host, path: '0.body' });
    service.activeEditor!.commands.setContent('<p>world</p>');

    service.cancel();

    expect(builderMock.updatePageContentByPath).not.toHaveBeenCalled();
    expect(host.innerHTML).toBe('<p>hello</p>');
    expect(service.activeEditor).toBeNull();
  });

  it('点击已激活元素不重建编辑器', () => {
    service.activate({ element: host, path: '0.body' });
    const editor = service.activeEditor;

    service.activate({ element: host, path: '0.body' });

    expect(service.activeEditor).toBe(editor);
  });

  it('切换到新元素前先提交上一个', () => {
    const other = document.createElement('div');
    other.innerHTML = '<p>two</p>';
    document.body.appendChild(other);
    service.activate({ element: host, path: '0.body' });
    service.activeEditor!.commands.setContent('<p>edited</p>');

    service.activate({ element: other, path: '1.body' });

    expect(builderMock.updatePageContentByPath).toHaveBeenCalledWith('0.body', '<p>edited</p>');
    expect(host.innerHTML).toBe('<p>edited</p>');
    expect(service.isActive(other)).toBe(true);
    other.remove();
  });

  it('编辑器失焦后提交', async () => {
    service.activate({ element: host, path: '0.body' });
    service.activeEditor!.commands.setContent('<p>blurred</p>');

    service.activeEditor!.view.dom.dispatchEvent(new FocusEvent('blur'));
    await flushMicrotasks();

    expect(builderMock.updatePageContentByPath).toHaveBeenCalledWith('0.body', '<p>blurred</p>');
    expect(service.activeEditor).toBeNull();
  });

  it('Esc 取消编辑', async () => {
    service.activate({ element: host, path: '0.body' });
    service.activeEditor!.commands.setContent('<p>changed</p>');

    service.activeEditor!.view.dom.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    await flushMicrotasks();

    expect(builderMock.updatePageContentByPath).not.toHaveBeenCalled();
    expect(host.innerHTML).toBe('<p>hello</p>');
  });
});
