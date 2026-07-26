import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { LayoutBuilderComponent } from './layout-builder.component';

describe('LayoutBuilderComponent', () => {
  let component: LayoutBuilderComponent;
  let fixture: ComponentFixture<LayoutBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutBuilderComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutBuilderComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
