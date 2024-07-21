import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderWorkspaceComponent } from './builder-workspace.component';

describe('BuilderWorkspaceComponent', () => {
  let component: BuilderWorkspaceComponent;
  let fixture: ComponentFixture<BuilderWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderWorkspaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuilderWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
