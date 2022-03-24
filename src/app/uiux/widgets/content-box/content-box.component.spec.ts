import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBoxComponent } from './content-box.component';

describe('ContentBoxComponent', () => {
  let component: ContentBoxComponent;
  let fixture: ComponentFixture<ContentBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
