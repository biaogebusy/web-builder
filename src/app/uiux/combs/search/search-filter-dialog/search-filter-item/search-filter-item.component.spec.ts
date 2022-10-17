import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterItemComponent } from './search-filter-item.component';

describe('SearchFilterItemComponent', () => {
  let component: SearchFilterItemComponent;
  let fixture: ComponentFixture<SearchFilterItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFilterItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
