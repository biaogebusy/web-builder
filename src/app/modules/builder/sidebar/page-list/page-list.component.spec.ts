import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { PageListComponent } from './page-list.component';

describe('PageListComponent', () => {
  let component: PageListComponent;
  let fixture: ComponentFixture<PageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageListComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(PageListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
