import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderSidebarListComponent } from './builder-sidebar-list.component';

describe('BuilderSidebarListComponent', () => {
  let component: BuilderSidebarListComponent;
  let fixture: ComponentFixture<BuilderSidebarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderSidebarListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderSidebarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
