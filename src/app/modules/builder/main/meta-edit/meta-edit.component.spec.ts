import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaEditComponent } from './meta-edit.component';

describe('MetaEditComponent', () => {
  let component: MetaEditComponent;
  let fixture: ComponentFixture<MetaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
