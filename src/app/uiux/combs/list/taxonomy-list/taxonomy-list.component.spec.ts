import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomyListComponent } from './taxonomy-list.component';

describe('TaxonomyListComponent', () => {
  let component: TaxonomyListComponent;
  let fixture: ComponentFixture<TaxonomyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxonomyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonomyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
