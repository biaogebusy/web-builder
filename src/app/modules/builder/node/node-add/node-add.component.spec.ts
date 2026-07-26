import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { NodeAddComponent } from './node-add.component';

describe('NodeAddComponent', () => {
  let component: NodeAddComponent;
  let fixture: ComponentFixture<NodeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeAddComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(NodeAddComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
