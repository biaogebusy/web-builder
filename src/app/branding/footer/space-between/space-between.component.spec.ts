import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceBetweenComponent } from './space-between.component';

describe('SpaceBetweenComponent', () => {
  let component: SpaceBetweenComponent;
  let fixture: ComponentFixture<SpaceBetweenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceBetweenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceBetweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
