import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { Hero2v3Component } from './hero2v3.component';

describe('Hero2v3Component', () => {
  let component: Hero2v3Component;
  let fixture: ComponentFixture<Hero2v3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero2v3Component],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero2v3Component);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
