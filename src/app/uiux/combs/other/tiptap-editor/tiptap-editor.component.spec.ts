import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { TiptapEditorComponent } from './tiptap-editor.component';

describe('TiptapEditorComponent', () => {
  let component: TiptapEditorComponent;
  let fixture: ComponentFixture<TiptapEditorComponent>;
  let isBrowser: boolean;

  beforeEach(async () => {
    isBrowser = true;
    await TestBed.configureTestingModule({
      imports: [TiptapEditorComponent],
      providers: [
        provideRouter([]),
        ...provideUiuxMocks(),
        { provide: ScreenService, useValue: { isPlatformBrowser: () => isBrowser } },
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
});
