import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineLightboxComponent } from './inline-lightbox.component';

describe('InlineLightboxComponent', () => {
  let component: InlineLightboxComponent;
  let fixture: ComponentFixture<InlineLightboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InlineLightboxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
