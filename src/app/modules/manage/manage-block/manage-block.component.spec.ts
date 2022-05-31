import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBlockComponent } from './manage-block.component';

describe('ManageBlockComponent', () => {
  let component: ManageBlockComponent;
  let fixture: ComponentFixture<ManageBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
