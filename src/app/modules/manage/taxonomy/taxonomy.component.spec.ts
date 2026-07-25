import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideCoreMocks } from '@core/testing/mocks';

import { TaxonomyComponent } from './taxonomy.component';

describe('TaxonomyComponent', () => {
  let component: TaxonomyComponent;
  let fixture: ComponentFixture<TaxonomyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxonomyComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaxonomyComponent);
    fixture.componentRef.setInput('content', { title: '' });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
