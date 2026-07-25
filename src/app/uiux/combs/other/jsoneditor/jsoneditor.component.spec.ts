import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

import { JsoneditorComponent } from './jsoneditor.component';

describe('JsoneditorComponent', () => {
  let component: JsoneditorComponent;
  let fixture: ComponentFixture<JsoneditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsoneditorComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(JsoneditorComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
