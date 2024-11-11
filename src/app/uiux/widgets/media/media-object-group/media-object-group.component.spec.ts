import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaObjectGroupComponent } from './media-object-group.component';

describe('MediaObjectGroupComponent', () => {
  let component: MediaObjectGroupComponent;
  let fixture: ComponentFixture<MediaObjectGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaObjectGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaObjectGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
