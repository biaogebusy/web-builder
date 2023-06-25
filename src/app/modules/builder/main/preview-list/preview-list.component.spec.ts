import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewListComponent } from './preview-list.component';

describe('PreviewListComponent', () => {
  let component: PreviewListComponent;
  let fixture: ComponentFixture<PreviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
