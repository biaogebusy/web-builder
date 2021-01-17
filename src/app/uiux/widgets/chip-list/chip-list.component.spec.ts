import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipListComponent } from './chip-list.component';

describe('ChipListComponent', () => {
  let component: ChipListComponent;
  let fixture: ComponentFixture<ChipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
