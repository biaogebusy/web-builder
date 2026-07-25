import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { ContentTextCenterComponent } from './content-text-center.component';

describe('ContentTextCenterComponent', () => {
  let component: ContentTextCenterComponent;
  let fixture: ComponentFixture<ContentTextCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentTextCenterComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentTextCenterComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
