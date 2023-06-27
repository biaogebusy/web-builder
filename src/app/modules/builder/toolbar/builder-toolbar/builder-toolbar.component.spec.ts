import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderToolbarComponent } from './builder-toolbar.component';

describe('BuilderToolbarComponent', () => {
  let component: BuilderToolbarComponent;
  let fixture: ComponentFixture<BuilderToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuilderToolbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
