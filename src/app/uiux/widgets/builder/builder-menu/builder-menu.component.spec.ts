import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderMenuComponent } from './builder-menu.component';

describe('BuilderMenuComponent', () => {
  let component: BuilderMenuComponent;
  let fixture: ComponentFixture<BuilderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuilderMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
