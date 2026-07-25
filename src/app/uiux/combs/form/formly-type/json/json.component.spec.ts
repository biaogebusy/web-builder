import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { JsonFieldType } from './json.component';

describe('JsonFieldType', () => {
  let component: JsonFieldType;
  let fixture: ComponentFixture<JsonFieldType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonFieldType],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(JsonFieldType);
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
