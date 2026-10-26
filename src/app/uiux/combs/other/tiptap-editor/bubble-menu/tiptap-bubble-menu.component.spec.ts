import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { TiptapBubbleMenuComponent } from './tiptap-bubble-menu.component';

describe('TiptapBubbleMenuComponent', () => {
  let fixture: ComponentFixture<TiptapBubbleMenuComponent>;
  let editor: Editor | null = null;
  let element: HTMLElement;

  const createEditor = (withAlign: boolean): Editor =>
    new Editor({
      element,
      extensions: [
        StarterKit,
        TextStyleKit,
        ...(withAlign ? [TextAlign.configure({ types: ['heading', 'paragraph'] })] : []),
      ],
      content: '<p>hello</p>',
    });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiptapBubbleMenuComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();
    element = document.createElement('div');
    document.body.appendChild(element);
    fixture = TestBed.createComponent(TiptapBubbleMenuComponent);
  });

  afterEach(() => {
    editor?.destroy();
    editor = null;
    element.remove();
    fixture.destroy();
  });

  it('样式面板:应用字色/字号到选区,空值恢复默认字号', () => {
    editor = createEditor(true);
    fixture.componentRef.setInput('editor', editor);
    fixture.detectChanges();
    editor.commands.selectAll();

    fixture.componentInstance.toggleStylePanel();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.style-panel')).toBeTruthy();

    fixture.componentInstance.applyColor(editor, '#ff0000');
    fixture.componentInstance.applyFontSize(editor, '24px');
    // The browser CSSOM may normalize hex to rgb(); both forms are valid
    expect(editor.getHTML()).toMatch(/color: (#ff0000|rgb\(255, 0, 0\))/);
    expect(editor.getHTML()).toContain('font-size: 24px');

    editor.commands.selectAll();
    fixture.componentInstance.applyFontSize(editor, '');
    expect(editor.getHTML()).not.toContain('font-size');
  });

  it('注册 TextAlign 时显示对齐按钮,单键循环切换', () => {
    editor = createEditor(true);
    fixture.componentRef.setInput('editor', editor);
    fixture.detectChanges();

    expect(fixture.componentInstance.hasAlign(editor)).toBe(true);
    fixture.componentInstance.cycleAlign(editor);
    expect(editor.isActive({ textAlign: 'center' })).toBe(true);
    expect(fixture.componentInstance.alignIcon(editor)).toBe('format-align-center');
  });

  it('未注册 TextAlign(inline 单行档)时隐藏对齐按钮', () => {
    editor = createEditor(false);
    fixture.componentRef.setInput('editor', editor);
    fixture.detectChanges();

    expect(fixture.componentInstance.hasAlign(editor)).toBe(false);
  });

  it('颜色回显归一化为 input[type=color] 可用的 hex', () => {
    editor = createEditor(true);
    fixture.componentRef.setInput('editor', editor);
    editor.commands.selectAll();
    editor.commands.setColor('rgb(255, 0, 0)');
    editor.commands.selectAll();

    expect(fixture.componentInstance.colorValue(editor, 'color', '#000000')).toBe('#ff0000');
  });
  it('renders only supported inline commands for a host-owned selection', async () => {
    fixture.componentRef.setInput('selectionState', {
      bold: true, italic: false, underline: false, link: false,
    });
    const commands: string[] = [];
    fixture.componentInstance.action.subscribe(command => commands.push(command));
    await fixture.whenStable();
    const buttons = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];
    expect(buttons.map(button => button.getAttribute('aria-label'))).toEqual([
      'BUILDER.TIPTAP.BOLD', 'BUILDER.TIPTAP.ITALIC', 'BUILDER.TIPTAP.UNDERLINE',
      'BUILDER.TIPTAP.LINK', 'BUILDER.TIPTAP.CLEAR_FORMAT',
    ]);
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    const pointer = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
    buttons[0].dispatchEvent(pointer);
    expect(pointer.defaultPrevented).toBe(true);
    buttons[0].click();
    buttons[3].click();
    buttons[4].click();
    await fixture.whenStable();
    expect(commands).toEqual(['bold', 'link', 'clearFormat']);
    expect(fixture.nativeElement.querySelector('app-tiptap-link-panel')).toBeNull();
  });

  it('keeps native rich-text formatting when no host-owned state is supplied', async () => {
    editor = createEditor(false);
    editor.setOptions({ editorProps: { handleScrollToSelection: () => true } });
    fixture.componentRef.setInput('editor', editor);
    editor.commands.setTextSelection({ from: 1, to: 6 });
    await fixture.whenStable();
    const bold = fixture.nativeElement.querySelector('[aria-label="BUILDER.TIPTAP.BOLD"]');
    bold.click();
    await fixture.whenStable();
    expect(editor.getHTML()).toContain('<strong>hello</strong>');
    expect(bold.getAttribute('aria-pressed')).toBe('true');
    fixture.nativeElement.querySelector('[aria-label="BUILDER.TIPTAP.CLEAR_FORMAT"]').click();
    await fixture.whenStable();
    expect(editor.getHTML()).toBe('<p>hello</p>');
  });

});
