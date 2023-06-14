import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderGeneraterComponent } from './builder-generater.component';

describe('BuilderGeneraterComponent', () => {
  let component: BuilderGeneraterComponent;
  let fixture: ComponentFixture<BuilderGeneraterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderGeneraterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderGeneraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
