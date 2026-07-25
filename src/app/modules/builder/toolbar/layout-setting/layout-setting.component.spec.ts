import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { LayoutSettingComponent } from './layout-setting.component';

describe('LayoutSettingComponent', () => {
  let component: LayoutSettingComponent;
  let fixture: ComponentFixture<LayoutSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSettingComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutSettingComponent);
    fixture.componentRef.setInput('content', { content: {}, fields: [] });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
