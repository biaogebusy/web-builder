import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseNodeComponent } from './case-node.component';

describe('CaseNodeComponent', () => {
  let component: CaseNodeComponent;
  let fixture: ComponentFixture<CaseNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
