import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStatusComponent } from './search-status.component';

describe('SearchStatusComponent', () => {
  let component: SearchStatusComponent;
  let fixture: ComponentFixture<SearchStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
