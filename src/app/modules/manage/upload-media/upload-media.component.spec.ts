import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideCoreMocks } from '@core/testing/mocks';

import { UploadMediaComponent } from './upload-media.component';

describe('UploadMediaComponent', () => {
  let component: UploadMediaComponent;
  let fixture: ComponentFixture<UploadMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadMediaComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadMediaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
