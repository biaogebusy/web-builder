import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchPreviewComponent } from './switch-preview.component';

describe('SwitchPreviewComponent', () => {
  let component: SwitchPreviewComponent;
  let fixture: ComponentFixture<SwitchPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
