import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderSidebarComponentsComponent } from './builder-sidebar-components.component';

describe('BuilderSidebarComponentsComponent', () => {
  let component: BuilderSidebarComponentsComponent;
  let fixture: ComponentFixture<BuilderSidebarComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderSidebarComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderSidebarComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
