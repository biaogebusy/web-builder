import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMediaListComponent } from './dynamic-media-list.component';

describe('DynamicMediaListComponent', () => {
  let component: DynamicMediaListComponent;
  let fixture: ComponentFixture<DynamicMediaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicMediaListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicMediaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
