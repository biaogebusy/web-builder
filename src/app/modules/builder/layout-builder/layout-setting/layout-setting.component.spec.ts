import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSettingComponent } from './layout-setting.component';

describe('LayoutSettingComponent', () => {
  let component: LayoutSettingComponent;
  let fixture: ComponentFixture<LayoutSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
