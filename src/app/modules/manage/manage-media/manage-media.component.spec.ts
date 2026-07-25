import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideCoreMocks } from '@core/testing/mocks';

import { ManageMediaComponent } from './manage-media.component';

describe('ManageMediaComponent', () => {
  let component: ManageMediaComponent;
  let fixture: ComponentFixture<ManageMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMediaComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageMediaComponent);
    fixture.componentRef.setInput('content', { mode: '', time: '' });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
