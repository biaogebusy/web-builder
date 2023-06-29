import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderEmptyComponent } from './builder-empty.component';

describe('BuilderEmptyComponent', () => {
  let component: BuilderEmptyComponent;
  let fixture: ComponentFixture<BuilderEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderEmptyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
