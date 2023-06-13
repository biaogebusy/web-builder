import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderSidebarWidgetsComponent } from './builder-sidebar-widgets.component';

describe('BuilderSidebarWidgetsComponent', () => {
  let component: BuilderSidebarWidgetsComponent;
  let fixture: ComponentFixture<BuilderSidebarWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderSidebarWidgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderSidebarWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
