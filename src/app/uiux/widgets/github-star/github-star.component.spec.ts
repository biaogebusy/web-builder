import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { GithubStarComponent } from './github-star.component';

describe('GithubStarComponent', () => {
  let component: GithubStarComponent;
  let fixture: ComponentFixture<GithubStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubStarComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(GithubStarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
