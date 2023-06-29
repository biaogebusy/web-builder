import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomyThinListComponent } from './taxonomy-thin-list.component';

describe('TaxonomyThinListComponent', () => {
  let component: TaxonomyThinListComponent;
  let fixture: ComponentFixture<TaxonomyThinListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxonomyThinListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonomyThinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
