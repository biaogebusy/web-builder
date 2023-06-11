import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderContentToolbarComponent } from './builder-content-toolbar.component';

describe('BuilderContentToolbarComponent', () => {
  let component: BuilderContentToolbarComponent;
  let fixture: ComponentFixture<BuilderContentToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderContentToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderContentToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
