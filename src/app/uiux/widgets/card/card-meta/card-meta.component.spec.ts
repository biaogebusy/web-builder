import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMetaComponent } from './card-meta.component';

describe('CardMetaComponent', () => {
  let component: CardMetaComponent;
  let fixture: ComponentFixture<CardMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
