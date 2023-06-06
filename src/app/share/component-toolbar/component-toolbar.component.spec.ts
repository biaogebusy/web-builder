import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentToolbarComponent } from './component-toolbar.component';

describe('ComponentToolbarComponent', () => {
  let component: ComponentToolbarComponent;
  let fixture: ComponentFixture<ComponentToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
