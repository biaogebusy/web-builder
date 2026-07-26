import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { RichEditorComponent } from './rich-editor.component';

describe('RichEditorComponent', () => {
  let component: RichEditorComponent;
  let fixture: ComponentFixture<RichEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichEditorComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(RichEditorComponent);
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
});
