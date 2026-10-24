import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { ScreenState } from '@core/state/screen/ScreenState';
import { BehaviorSubject } from 'rxjs';

import { BuilderComponent } from './builder.component';

@Component({ selector: 'app-builder-route-target', template: '' })
class RouteTargetComponent {}

describe('BuilderComponent', () => {
  let component: BuilderComponent;
  let fixture: ComponentFixture<BuilderComponent>;
  let viewport: BehaviorSubject<string[]>;

  beforeEach(async () => {
    viewport = new BehaviorSubject(['xs']);
    await TestBed.configureTestingModule({
      imports: [BuilderComponent],
      providers: [
        provideRouter([
          {
            path: 'workspace',
            children: [{ path: 'editor', component: RouteTargetComponent }],
          },
          { path: 'home', component: RouteTargetComponent },
        ]),
        ...provideBuilderMocks(),
        { provide: ScreenState, useValue: { mqAlias$: () => viewport } },
      ],
    }).overrideComponent(BuilderComponent, {
      set: { template: '' },
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderComponent);
    component = fixture.componentInstance;
  });

  it('starts mobile navigation closed and preserves an explicit expansion', async () => {
    await fixture.whenStable();
    expect(component.isMobile()).toBe(true);
    expect(component.sidebarDrawerOpened()).toBe(false);
    component.sidebarDrawerOpened.set(true);
    viewport.next(['xs']);
    await fixture.whenStable();
    expect(component.sidebarDrawerOpened()).toBe(true);
  });

  it('closes mobile navigation after a route change', async () => {
    await fixture.whenStable();
    component.sidebarDrawerOpened.set(true);
    await TestBed.inject(Router).navigateByUrl('/workspace/editor');
    await fixture.whenStable();
    expect(component.sidebarDrawerOpened()).toBe(false);
  });

  it('keeps desktop navigation expanded across routes and collapses when entering mobile', async () => {
    viewport.next(['lg']);
    await fixture.whenStable();
    expect(component.isMobile()).toBe(false);
    component.sidebarDrawerOpened.set(true);
    await fixture.whenStable();
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/home');
    await fixture.whenStable();
    expect(component.sidebarDrawerOpened()).toBe(true);

    viewport.next(['xs']);
    await fixture.whenStable();
    expect(component.sidebarDrawerOpened()).toBe(false);
    expect(component.isMobile()).toBe(true);
  });
});
