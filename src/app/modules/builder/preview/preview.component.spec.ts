import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { PreviewComponent } from './preview.component';

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
