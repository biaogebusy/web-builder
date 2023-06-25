import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderSampleComponent } from './builder-sample.component';

describe('BuilderSampleComponent', () => {
  let component: BuilderSampleComponent;
  let fixture: ComponentFixture<BuilderSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
