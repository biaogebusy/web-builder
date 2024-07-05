import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMediaComponent } from './upload-media.component';

describe('UploadMediaComponent', () => {
  let component: UploadMediaComponent;
  let fixture: ComponentFixture<UploadMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadMediaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
