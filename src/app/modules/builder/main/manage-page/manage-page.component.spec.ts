import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { ManagePageComponent } from './manage-page.component';

describe('ManagePageComponent', () => {
  let component: ManagePageComponent;
  let fixture: ComponentFixture<ManagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePageComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagePageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
