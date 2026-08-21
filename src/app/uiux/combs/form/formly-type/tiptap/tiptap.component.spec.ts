import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import { vi } from 'vitest';

import { TiptapFieldType } from './tiptap.component';

describe('TiptapFieldType', () => {
  let component: TiptapFieldType;
  let fixture: ComponentFixture<TiptapFieldType>;
  let formControl: UntypedFormControl;
  let isBrowser: boolean;

  /** First render completes in the SSR environment, then switch to browser to initialize explicitly, so the editor is not created twice */
  const setup = async (props: any = {}, value: any = null) => {
    isBrowser = false;
    await TestBed.configureTestingModule({
      imports: [TiptapFieldType],
      providers: [
        provideRouter([]),
        ...provideUiuxMocks(),
        { provide: ScreenService, useValue: { isPlatformBrowser: () => isBrowser } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TiptapFieldType);
    component = fixture.componentInstance;
    formControl = new UntypedFormControl(value);
    component.field = {
      key: 'body',
      props,
      formControl,
      formState: {},
      options: { showError: () => false },
    } as any;
    fixture.detectChanges();
  };

  const activateInBrowser = async () => {
    isBrowser = true;
    await component.activateEditor();
    fixture.detectChanges();
  };

  const editorInstance = () =>
    fixture.debugElement.query(By.css('app-tiptap-editor'))?.componentInstance;

  it('should create', async () => {
    await setup();
    expect(component).toBeTruthy();
  });

  it('SSR 环境下不创建编辑器', async () => {
    await setup();
    expect(editorInstance()).toBeUndefined();
  });

  it('公共表单默认不自动加载编辑器,用户激活后才创建', async () => {
    await setup();
    isBrowser = true;
    const loadEditor = vi.spyOn(component as any, 'loadEditor');

    await component.ngAfterViewInit();
    fixture.detectChanges();

    expect(loadEditor).not.toHaveBeenCalled();
    expect(editorInstance()).toBeUndefined();
    expect(fixture.debugElement.query(By.css('app-btn'))).toBeTruthy();

    await activateInBrowser();
    expect(editorInstance()).toBeTruthy();
    expect(editorInstance().autofocus()).toBe(true);
  });

  it('autoLoad 显式开启时自动加载编辑器', async () => {
    await setup({ autoLoad: true });
    isBrowser = true;

    await component.ngAfterViewInit();
    fixture.detectChanges();

    expect(editorInstance()).toBeTruthy();
    expect(editorInstance().autofocus()).toBe(false);
  });

  it('以表单值作为编辑器初始内容', async () => {
    await setup({}, '<p>hello</p>');

    await activateInBrowser();

    expect(editorInstance().editor().getHTML()).toContain('hello');
  });

  it('编辑器内容变化回写表单值', async () => {
    await setup();
    await activateInBrowser();

    editorInstance().htmlChange.emit('<p>changed</p>');

    expect(formControl.value).toBe('<p>changed</p>');
  });

  it('把 placeholder 与 toolbarContainer 透传给编辑器', async () => {
    await setup({ placeholder: '请输入正文', toolbarContainer: '#node-editor-toolbar' });

    await activateInBrowser();

    expect(editorInstance().content().placeholder).toBe('请输入正文');
    expect(editorInstance().toolbarContainer()).toBe('#node-editor-toolbar');
  });

  it('表单 reset 后编辑器同步清空(所见与提交值一致)', async () => {
    await setup({}, '<p>old</p>');
    await activateInBrowser();

    formControl.reset();

    expect(editorInstance().editor().isEmpty).toBe(true);
    // Reset does not write back to the form; stays null after reset
    expect(formControl.value).toBeNull();
  });

  it('外部回填值同步进编辑器,禁用同步为不可编辑', async () => {
    await setup();
    await activateInBrowser();

    formControl.setValue('<p>filled</p>');
    expect(editorInstance().editor().getHTML()).toContain('filled');

    formControl.disable();
    expect(editorInstance().editor().isEditable).toBe(false);
  });

  it('readonly 字段创建只读编辑器', async () => {
    await setup({ readonly: true });
    await activateInBrowser();

    expect(editorInstance().editor().isEditable).toBe(false);
  });
});
