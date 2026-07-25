import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { BuilderSidebarComponent } from './builder-sidebar.component';

describe('BuilderSidebarComponent', () => {
  let component: BuilderSidebarComponent;
  let fixture: ComponentFixture<BuilderSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderSidebarComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderSidebarComponent);
    fixture.componentRef.setInput('sidebarDrawer', { opened: false, toggle: vi.fn(), open: vi.fn(), close: vi.fn() });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
