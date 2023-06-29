import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextHeroComponent } from './text-hero.component';

describe('TextHeroComponent', () => {
  let component: TextHeroComponent;
  let fixture: ComponentFixture<TextHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
