import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { MatSelectComponent } from './mat-select.component';

describe('MatSelectComponent', () => {
  let component: MatSelectComponent;
  let fixture: ComponentFixture<MatSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSelectComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(MatSelectComponent);
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
