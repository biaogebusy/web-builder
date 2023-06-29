import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchActionComponent } from './search-action.component';

describe('SearchActionComponent', () => {
  let component: SearchActionComponent;
  let fixture: ComponentFixture<SearchActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
