import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderSidebarTopComponent } from './builder-sidebar-top.component';

describe('BuilderSidebarTopComponent', () => {
  let component: BuilderSidebarTopComponent;
  let fixture: ComponentFixture<BuilderSidebarTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderSidebarTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderSidebarTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
