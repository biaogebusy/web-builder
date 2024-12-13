import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingComponent } from './user-setting.component';

describe('UserSettingComponent', () => {
  let component: UserSettingComponent;
  let fixture: ComponentFixture<UserSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
