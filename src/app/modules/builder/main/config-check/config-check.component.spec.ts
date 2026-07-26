import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { ConfigCheckComponent } from './config-check.component';

describe('ConfigCheckComponent', () => {
  let component: ConfigCheckComponent;
  let fixture: ComponentFixture<ConfigCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigCheckComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigCheckComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
