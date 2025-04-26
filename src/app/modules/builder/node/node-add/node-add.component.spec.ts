import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeAddComponent } from './node-add.component';

describe('NodeAddComponent', () => {
  let component: NodeAddComponent;
  let fixture: ComponentFixture<NodeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
