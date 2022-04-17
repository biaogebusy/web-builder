import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleWidgetsComponent } from './sample-widgets.component';

describe('SampleWidgetsComponent', () => {
  let component: SampleWidgetsComponent;
  let fixture: ComponentFixture<SampleWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleWidgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
