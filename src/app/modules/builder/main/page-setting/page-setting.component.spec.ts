import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { PageSettingComponent } from './page-setting.component';

describe('PageSettingComponent', () => {
  let component: PageSettingComponent;
  let fixture: ComponentFixture<PageSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSettingComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(PageSettingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
