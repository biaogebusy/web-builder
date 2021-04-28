import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhychooseusComponent } from './whychooseus.component';

describe('WhychooseusComponent', () => {
  let component: WhychooseusComponent;
  let fixture: ComponentFixture<WhychooseusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhychooseusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhychooseusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
