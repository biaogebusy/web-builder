import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTemplateComponent } from './custom-template.component';

describe('CustomTemplateComponent', () => {
  let component: CustomTemplateComponent;
  let fixture: ComponentFixture<CustomTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
