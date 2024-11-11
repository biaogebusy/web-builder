import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUs1v1Component } from './contact-us1v1.component';

describe('ContactUs1v1Component', () => {
  let component: ContactUs1v1Component;
  let fixture: ComponentFixture<ContactUs1v1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactUs1v1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUs1v1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
