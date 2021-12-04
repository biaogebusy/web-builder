import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobNodeComponent } from './job-node.component';

describe('JobNodeComponent', () => {
  let component: JobNodeComponent;
  let fixture: ComponentFixture<JobNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
