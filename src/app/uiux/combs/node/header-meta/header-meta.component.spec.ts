import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMetaComponent } from './header-meta.component';

describe('HeaderMetaComponent', () => {
  let component: HeaderMetaComponent;
  let fixture: ComponentFixture<HeaderMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderMetaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
