import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubStarComponent } from './github-star.component';

describe('GithubStarComponent', () => {
  let component: GithubStarComponent;
  let fixture: ComponentFixture<GithubStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GithubStarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
