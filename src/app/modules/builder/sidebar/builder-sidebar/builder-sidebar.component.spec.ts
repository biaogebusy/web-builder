import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderSidebarComponent } from './builder-sidebar.component';

describe('BuilderSidebarComponent', () => {
  let component: BuilderSidebarComponent;
  let fixture: ComponentFixture<BuilderSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuilderSidebarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
