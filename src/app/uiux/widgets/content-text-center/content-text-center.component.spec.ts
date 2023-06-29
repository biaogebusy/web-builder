import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTextCenterComponent } from './content-text-center.component';

describe('ContentTextCenterComponent', () => {
  let component: ContentTextCenterComponent;
  let fixture: ComponentFixture<ContentTextCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentTextCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTextCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
