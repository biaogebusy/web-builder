import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Editor } from '@tiptap/core';
import Image from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { TiptapImagePanelComponent } from './tiptap-image-panel.component';

describe('TiptapImagePanelComponent', () => {
  let fixture: ComponentFixture<TiptapImagePanelComponent>;
  let editor: Editor;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiptapImagePanelComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();
    element = document.createElement('div');
    document.body.appendChild(element);
    editor = new Editor({
      element,
      extensions: [StarterKit, Image],
      content: '<img src="/files/a.png" alt="old" width="320" height="180"><p></p>',
    });
    editor.commands.setNodeSelection(0);
    fixture = TestBed.createComponent(TiptapImagePanelComponent);
    fixture.componentRef.setInput('editor', editor);
    fixture.detectChanges();
  });

  afterEach(() => {
    editor.destroy();
    element.remove();
    fixture.destroy();
  });

  it('updates image alt, width and height attributes', () => {
    fixture.componentInstance.apply('New alt', '640', '360');

    expect(editor.getHTML()).toContain('alt="New alt"');
    expect(editor.getHTML()).toContain('width="640"');
    expect(editor.getHTML()).toContain('height="360"');
  });

  it('clears dimensions when the inputs are empty', () => {
    fixture.componentInstance.apply('', '', '0');

    expect(editor.getHTML()).toContain('alt=""');
    expect(editor.getHTML()).not.toContain('width=');
    expect(editor.getHTML()).not.toContain('height=');
  });
});
