import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSidebarComponent } from './manage-sidebar.component';

describe('ManageSidebarComponent', () => {
  let component: ManageSidebarComponent;
  let fixture: ComponentFixture<ManageSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
