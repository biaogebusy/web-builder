import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPickerComponent } from './img-picker.component';

describe('ImgPickerComponent', () => {
  let component: ImgPickerComponent;
  let fixture: ComponentFixture<ImgPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgPickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
