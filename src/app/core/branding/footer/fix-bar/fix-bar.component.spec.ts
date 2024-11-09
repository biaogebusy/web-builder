import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixBarComponent } from './fix-bar.component';

describe('FixBarComponent', () => {
  let component: FixBarComponent;
  let fixture: ComponentFixture<FixBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FixBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
