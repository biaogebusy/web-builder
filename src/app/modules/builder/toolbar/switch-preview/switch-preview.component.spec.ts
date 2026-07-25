import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { SwitchPreviewComponent } from './switch-preview.component';

describe('SwitchPreviewComponent', () => {
  let component: SwitchPreviewComponent;
  let fixture: ComponentFixture<SwitchPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchPreviewComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchPreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
