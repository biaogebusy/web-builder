import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import { vi } from 'vitest';

import { TiptapLinkPanelComponent } from './link-panel/tiptap-link-panel.component';
import { TiptapEditorComponent } from './tiptap-editor.component';

describe('TiptapEditorComponent', () => {
  let component: TiptapEditorComponent;
  let fixture: ComponentFixture<TiptapEditorComponent>;
  let isBrowser: boolean;
  let nodeServiceMock: { pickAndUploadImage: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    isBrowser = true;
    nodeServiceMock = { pickAndUploadImage: vi.fn() };
    await TestBed.configureTestingModule({
      imports: [TiptapEditorComponent],
      providers: [
        provideRouter([]),
        ...provideUiuxMocks(),
        { provide: ScreenService, useValue: { isPlatformBrowser: () => isBrowser } },
        { provide: NodeService, useValue: nodeServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TiptapEditorComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('initializes the editor with the content html in the browser', () => {
    fixture.componentRef.setInput('content', { html: '<p>hello</p>' });

    fixture.detectChanges();

    expect(component.editor()).toBeTruthy();
    expect(component.editor()?.getHTML()).toContain('hello');
  });

  it('skips editor init on the server', () => {
    isBrowser = false;

    fixture.detectChanges();

    expect(component.editor()).toBeNull();
  });

  it('renders the toolbar inside the editor box by default', () => {
    fixture.detectChanges();

    expect(component.toolbarDetached()).toBe(false);
    expect(fixture.nativeElement.querySelector('.toolbar')).toBeTruthy();
  });

  it('projects the toolbar into the container given by toolbarContainer', () => {
    const container = document.createElement('div');
    container.id = 'external-toolbar';
    document.body.appendChild(container);
    fixture.componentRef.setInput('toolbarContainer', '#external-toolbar');

    fixture.detectChanges();

    expect(component.toolbarDetached()).toBe(true);
    expect(container.querySelector('.toolbar')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.toolbar')).toBeNull();

    // 销毁只回收投影出去的工具栏,外部容器本身仍归调用方所有
    fixture.destroy();
    expect(container.querySelector('.toolbar')).toBeNull();
    expect(container.isConnected).toBe(true);
    container.remove();
  });

  it('uses the placeholder from content', () => {
    fixture.componentRef.setInput('content', { placeholder: '请输入正文内容' });

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-placeholder="请输入正文内容"]')).toBeTruthy();
  });

  it('emits an empty string when the document is cleared', () => {
    fixture.componentRef.setInput('content', { html: '<p>hello</p>' });
    fixture.detectChanges();
    const emitted: string[] = [];
    component.htmlChange.subscribe(html => emitted.push(html));

    component.editor()?.commands.clearContent(true);

    expect(emitted).toEqual(['']);
  });

  it('inserts uploaded images instead of asking for a url', () => {
    fixture.detectChanges();

    component.addImage();

    expect(nodeServiceMock.pickAndUploadImage).toHaveBeenCalled();
    const insert = nodeServiceMock.pickAndUploadImage.mock.calls[0][0];
    insert('/sites/default/files/a.png');
    expect(component.editor()?.getHTML()).toContain('src="/sites/default/files/a.png"');
  });

  it('setContent 应用外部值且不触发 htmlChange,相同内容跳过', () => {
    fixture.componentRef.setInput('content', { html: '<p>a</p>' });
    fixture.detectChanges();
    const emitted: string[] = [];
    component.htmlChange.subscribe(html => emitted.push(html));

    component.setContent('<p>b</p>');

    expect(component.editor()?.getHTML()).toContain('b');
    // 相同内容不重建文档,正在输入的光标/选区不受影响
    const doc = component.editor()!.state.doc;
    component.setContent(component.editor()!.getHTML());
    expect(component.editor()!.state.doc).toBe(doc);
    expect(emitted).toEqual([]);
  });

  it('链接面板:应用/回填/移除,且不把样式类写进内容', () => {
    fixture.detectChanges();
    const editor = component.editor()!;
    editor.commands.setContent('<p>hello</p>');
    editor.commands.setTextSelection({ from: 1, to: 6 });

    component.openLinkPanel();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.link-panel input')).toBeTruthy();

    // 链接行为收敛到共享子组件(气泡工具栏同款),父组件只管开合
    const panel = (): TiptapLinkPanelComponent =>
      fixture.debugElement.query(By.directive(TiptapLinkPanelComponent)).componentInstance;
    panel().apply('https://example.com');
    expect(editor.getHTML()).toContain('href="https://example.com"');
    expect(editor.getHTML()).not.toContain('text-blue-500');
    expect(component.linkPanelOpen()).toBe(false);
    fixture.detectChanges();

    // 再次打开面板带回当前链接,移除后链接消失
    editor.commands.setTextSelection({ from: 1, to: 6 });
    component.openLinkPanel();
    fixture.detectChanges();
    expect(panel().linkUrl()).toBe('https://example.com');
    panel().remove();
    expect(editor.getHTML()).not.toContain('href=');
  });

  it('工具栏含下划线与高亮按钮,aria-label 走翻译键', () => {
    fixture.detectChanges();

    const labels = Array.from(fixture.nativeElement.querySelectorAll('.toolbar button')).map(btn =>
      (btn as HTMLElement).getAttribute('aria-label')
    );

    expect(labels).toContain('BUILDER.TIPTAP.UNDERLINE');
    expect(labels).toContain('BUILDER.TIPTAP.HIGHLIGHT');
  });

  it('方向键在工具栏按钮间移动焦点', () => {
    fixture.detectChanges();
    const toolbar = fixture.nativeElement.querySelector('.toolbar') as HTMLElement;
    const buttons = Array.from(
      toolbar.querySelectorAll<HTMLButtonElement>('button:not([disabled])')
    );
    buttons[0].focus();

    buttons[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(document.activeElement).toBe(buttons[1]);

    buttons[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(document.activeElement).toBe(buttons[0]);
  });
});
