import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderTemplateComponent } from './builder-template.component';

describe('BuilderTemplateComponent', () => {
  let component: BuilderTemplateComponent;
  let fixture: ComponentFixture<BuilderTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuilderTemplateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
