import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideCoreMocks } from '@core/testing/mocks';

import { InverseComponent } from './inverse.component';

describe('InverseComponent', () => {
  let component: InverseComponent;
  let fixture: ComponentFixture<InverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InverseComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(InverseComponent);
    fixture.componentRef.setInput('content', { footerNewsletter: { params: {} } });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
