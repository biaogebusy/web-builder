import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderPanelComponent } from './builder-panel.component';

describe('BuilderPanelComponent', () => {
  let component: BuilderPanelComponent;
  let fixture: ComponentFixture<BuilderPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuilderPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
