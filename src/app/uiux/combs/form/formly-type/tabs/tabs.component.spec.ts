import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsTypeComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: TabsTypeComponent;
  let fixture: ComponentFixture<TabsTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsTypeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
