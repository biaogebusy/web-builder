import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InverseComponent } from './inverse.component';

describe('InverseComponent', () => {
  let component: InverseComponent;
  let fixture: ComponentFixture<InverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InverseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InverseComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reuse the server-rendered host during hydration', () => {
    expect(fixture.nativeElement.hasAttribute('ngskiphydration')).toBe(false);
  });
});
