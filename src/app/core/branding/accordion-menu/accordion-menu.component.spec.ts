import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import type { IUser } from '@core/interface/IUser';
import { provideCoreMocks } from '@core/testing/mocks';
import { USER } from '@core/token/token-providers';
import { UserService } from '@core/service/user.service';

import { AccordionMenuComponent } from './accordion-menu.component';

describe('AccordionComponent', () => {
  let component: AccordionMenuComponent;
  let fixture: ComponentFixture<AccordionMenuComponent>;
  const user = signal<IUser | boolean>(false);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionMenuComponent],
      providers: [
        provideRouter([]), ...provideCoreMocks(),
        { provide: USER, useValue: user },
        { provide: UserService, useValue: { checkShow: UserService.prototype.checkShow } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps ungrouped links and consecutive sections in their configured order', async () => {
    fixture.componentRef.setInput('content', [
      { label: 'Ungrouped', href: '/plain' },
      { label: 'First', href: '/first', group: 'Content' },
      { label: 'Second', href: '/second', group: 'Content' },
      { label: 'Third', href: '/third', group: 'System' },
      { label: 'Fourth', href: '/fourth', group: 'Content' },
    ]);
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;
    expect(Array.from(host.querySelectorAll('h2, a'), node => node.textContent?.trim()))
      .toEqual(['Ungrouped', 'Content', 'First', 'Second', 'System', 'Third', 'Content', 'Fourth']);
    expect(host.querySelectorAll('mat-expansion-panel')).toHaveLength(0);
    expect(host.querySelectorAll('.menu-group-divider')).toHaveLength(3);
    expect(Array.from(host.querySelectorAll('a'), link => link.getAttribute('href')))
      .toEqual(['/plain', '/first', '/second', '/third', '/fourth']);
  });

  it('hides empty sections and updates their titles when account roles change', async () => {
    user.set(false);
    fixture.componentRef.setInput('content', [
      { label: 'Hidden first', group: 'Content', params: { reqRoles: ['administrator'] } },
      { label: 'Visible second', group: 'Content', href: '/visible' },
      { label: 'Admin only', group: 'Admin', params: { reqRoles: ['administrator'] } },
    ]);
    await fixture.whenStable();
    const headings = () => [...fixture.nativeElement.querySelectorAll('h2')]
      .map((heading: Element) => heading.textContent?.trim());
    expect(headings()).toEqual(['Content']);
    expect(fixture.nativeElement.querySelectorAll('.menu-group-divider')).toHaveLength(0);
    user.set({ current_user: { uid: '7', roles: ['administrator'] } } as IUser);
    await fixture.whenStable();
    expect(headings()).toEqual(['Content', 'Admin']);
    expect(fixture.nativeElement.querySelectorAll('.menu-group-divider')).toHaveLength(1);
    user.set(false);
    await fixture.whenStable();
    expect(headings()).toEqual(['Content']);
    expect(fixture.nativeElement.textContent).not.toContain('Admin only');
  });
});
