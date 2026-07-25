import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { TermsServiceComponent } from './terms-service.component';

describe('TermsServiceComponent', () => {
  let component: TermsServiceComponent;
  let fixture: ComponentFixture<TermsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsServiceComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(TermsServiceComponent);
    fixture.componentRef.setInput('content', { key: 'agree', label: '' });
    fixture.componentRef.setInput('form', new UntypedFormGroup({ agree: new UntypedFormControl(false) }));
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
