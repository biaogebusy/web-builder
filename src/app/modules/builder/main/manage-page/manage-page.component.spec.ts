import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePageComponent } from './manage-page.component';

describe('ManagePageComponent', () => {
  let component: ManagePageComponent;
  let fixture: ComponentFixture<ManagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
