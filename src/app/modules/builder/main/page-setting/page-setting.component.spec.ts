import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UserService } from '@core/service/user.service';
import { createUserServiceMock } from '@core/testing/mocks';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { PageSettingComponent } from './page-setting.component';

describe('PageSettingComponent', () => {
  let component: PageSettingComponent;
  let fixture: ComponentFixture<PageSettingComponent>;
  const userService = createUserServiceMock();

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [PageSettingComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: UserService, useValue: userService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageSettingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sends signed-out users to the login dialog instead of updating', async () => {
    await component.onUpdate({ type: 'node--landing_page' });

    expect(userService.openLoginDialog).toHaveBeenCalled();
  });

  it('sends signed-out users to the login dialog instead of deleting', () => {
    component.deletePage({ type: 'node--landing_page' });

    expect(userService.openLoginDialog).toHaveBeenCalled();
  });
});
