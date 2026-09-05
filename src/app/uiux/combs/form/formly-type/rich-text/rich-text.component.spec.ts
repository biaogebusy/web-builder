import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { RichTextComponent } from './rich-text.component';

describe('RichTextComponent', () => {
  let component: RichTextComponent;
  let fixture: ComponentFixture<RichTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichTextComponent],
      providers: [
        provideRouter([]),
        ...provideUiuxMocks(),
        { provide: ScreenService, useValue: { isPlatformBrowser: () => true } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RichTextComponent);
    component = fixture.componentInstance;
    component.field = {
      key: 'k',
      props: { options: [] },
      formControl: new UntypedFormControl(),
      formState: {},
      options: { showError: () => false },
    } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not open the editor popup for a disabled control', () => {
    component.formControl.disable();
    fixture.detectChanges();

    component.openRichText();

    expect(component.editorLoading()).toBe(false);
    expect(fixture.nativeElement.querySelector('.popup').hasAttribute('data-popper-placement')).toBe(
      false
    );
  });

  it('makes an open editor read-only and skips saving when the control becomes disabled', async () => {
    component.formControl.setValue('<p>stored</p>');
    fixture.detectChanges();

    await component.openRichText();
    fixture.detectChanges();

    const editor = fixture.debugElement.query(By.css('app-tiptap-editor'))?.componentInstance;
    expect(editor).toBeTruthy();
    component.value = '<p>draft</p>';

    component.formControl.disable();
    expect(editor.editor().isEditable).toBe(false);
    component.onSave();

    expect(component.formControl.value).toBe('<p>stored</p>');
    expect(component.editorLoaded()).toBe(false);
  });
});
