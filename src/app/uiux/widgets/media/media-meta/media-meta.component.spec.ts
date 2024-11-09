import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaMetaComponent } from './media-meta.component';

describe('MediaMetaComponent', () => {
  let component: MediaMetaComponent;
  let fixture: ComponentFixture<MediaMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaMetaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
