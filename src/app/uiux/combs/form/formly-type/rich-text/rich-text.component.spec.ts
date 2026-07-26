import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { RichTextComponent } from './rich-text.component';

describe('RichTextComponent', () => {
  let component: RichTextComponent;
  let fixture: ComponentFixture<RichTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichTextComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
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
});
