import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockToolbarComponent } from './block-toolbar.component';

describe('BlockToolbarComponent', () => {
  let component: BlockToolbarComponent;
  let fixture: ComponentFixture<BlockToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
