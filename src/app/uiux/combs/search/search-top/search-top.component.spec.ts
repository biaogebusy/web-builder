import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTopComponent } from './search-top.component';

describe('SearchTopComponent', () => {
  let component: SearchTopComponent;
  let fixture: ComponentFixture<SearchTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
