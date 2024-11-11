import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSettingComponent } from './page-setting.component';

describe('PageSettingComponent', () => {
  let component: PageSettingComponent;
  let fixture: ComponentFixture<PageSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSettingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
