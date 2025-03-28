import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorComponent } from './collector.component';

describe('CollectorComponent', () => {
  let component: CollectorComponent;
  let fixture: ComponentFixture<CollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
