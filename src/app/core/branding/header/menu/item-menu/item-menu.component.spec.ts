import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideCoreMocks } from '@core/testing/mocks';

import { ItemMenuComponent } from './item-menu.component';

describe('ItemMenuComponent', () => {
  let component: ItemMenuComponent;
  let fixture: ComponentFixture<ItemMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemMenuComponent],
      providers: [provideRouter([]), ...provideCoreMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemMenuComponent);
    fixture.componentRef.setInput('content', { child: [] });
    fixture.componentRef.setInput('params', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
