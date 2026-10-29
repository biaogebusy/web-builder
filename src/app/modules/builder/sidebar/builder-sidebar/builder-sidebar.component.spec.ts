import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { BUILDER_CONFIG, USER } from '@core/token/token-providers';
import { UserService } from '@core/service/user.service';

import { BuilderSidebarComponent } from './builder-sidebar.component';

describe('BuilderSidebarComponent', () => {
  let component: BuilderSidebarComponent;
  let fixture: ComponentFixture<BuilderSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderSidebarComponent, MatIconTestingModule],
      providers: [
        provideRouter([]), ...provideBuilderMocks(),
        { provide: USER, useValue: signal(false) },
        { provide: UserService, useValue: { checkShow: UserService.prototype.checkShow } },
        { provide: BUILDER_CONFIG, useValue: of({ menu: [{ label: 'Fixture', child: [
          { group: 'Content', label: 'Page', href: '/builder/page-list' },
          { group: 'Hidden', label: 'Private', params: { reqRoles: ['administrator'] } },
          { group: 'System', label: 'Settings', href: '/builder/settings' },
        ] }] }) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderSidebarComponent);
    fixture.componentRef.setInput('sidebarDrawer', { opened: false, toggle: vi.fn(), open: vi.fn(), close: vi.fn() });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([false, true])('renders matching visible groups with the drawer opened=%s', async opened => {
    fixture.componentRef.setInput('sidebarDrawer', { opened });
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;
    const menu = opened
      ? host.querySelector('app-accordion-menu app-accordion-menu')!
      : host.querySelector('.child-menu')!;
    expect(Array.from(menu.querySelectorAll('.menu-group-heading'), node => node.textContent?.trim()))
      .toEqual(['Content', 'System']);
    expect(menu.textContent).not.toContain('Private');
    expect(menu.querySelectorAll('.menu-group-divider')).toHaveLength(1);
    expect(Array.from(menu.querySelectorAll('a'), link => link.getAttribute('href')))
      .toEqual(['/builder/page-list', '/builder/settings']);
  });
});
