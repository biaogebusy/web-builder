import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDrawer } from '@angular/material/sidenav';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { BuilderState } from '@core/state/BuilderState';
import { provideRouter, Router } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import type { MockInstance } from 'vitest';

import { BuilderComponent } from './builder.component';

@Component({ selector: 'app-builder-route-target', template: '' })
class RouteTargetComponent {}

describe('BuilderComponent', () => {
  let component: BuilderComponent;
  let fixture: ComponentFixture<BuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderComponent, MatIconTestingModule],
      providers: [
        provideRouter([
          {
            path: 'workspace',
            data: { hideSidebarOnMobile: true },
            children: [{ path: 'editor', component: RouteTargetComponent }],
          },
          { path: 'home', component: RouteTargetComponent },
        ]),
        ...provideBuilderMocks(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hides navigation only for opted-in routes and restores it when leaving', async () => {
    const router = TestBed.inject(Router);
    expect(component.hideSidebarOnMobile()).toBe(false);
    await router.navigateByUrl('/workspace/editor');
    expect(component.hideSidebarOnMobile()).toBe(true);
    await router.navigateByUrl('/home');
    expect(component.hideSidebarOnMobile()).toBe(false);
  });

  describe('pending right drawer opens', () => {
    let open: MockInstance<MatDrawer['open']>;
    let close: MockInstance<MatDrawer['close']>;
    let state: BuilderState;

    beforeEach(async () => {
      await fixture.whenStable();
      state = TestBed.inject(BuilderState);
      const drawer = fixture.debugElement.queryAll(By.directive(MatDrawer))
        .find(element => element.nativeElement.classList.contains('right-drawer'))!
        .injector.get(MatDrawer);
      open = vi.spyOn(drawer, 'open').mockResolvedValue('open');
      close = vi.spyOn(drawer, 'close').mockResolvedValue('close');
      vi.useFakeTimers();
    });

    afterEach(() => {
      fixture.destroy();
      vi.useRealTimers();
    });

    it('waits for the latest content and cancels the pending open on a close command', () => {
      state.rightContent$.next({ title: 'First', elements: [] });
      vi.advanceTimersByTime(50);
      state.rightContent$.next({ title: 'Latest', elements: [] });
      vi.advanceTimersByTime(50);
      expect(open).not.toHaveBeenCalled();
      state.closeRightDrawer$.next(true);
      vi.advanceTimersByTime(100);
      expect(open).not.toHaveBeenCalled();
      expect(close).toHaveBeenCalledOnce();
      state.rightContent$.next({ title: 'Reopened', elements: [] });
      vi.advanceTimersByTime(100);
      expect(open).toHaveBeenCalledOnce();
    });

    it('notifies readers and cancels pending opens when the builder is destroyed', () => {
      const closed = vi.fn();
      state.rightDrawerClosed$.subscribe(closed);
      state.rightContent$.next({ title: 'Pending', elements: [] });
      fixture.destroy();
      vi.advanceTimersByTime(100);
      expect(closed).toHaveBeenCalledOnce();
      expect(open).not.toHaveBeenCalled();
    });

    it('sends one close command from the close button handler', () => {
      const requested = vi.fn();
      state.closeRightDrawer$.subscribe(requested);
      component.onClose();
      expect(requested).toHaveBeenCalledExactlyOnceWith(true);
      expect(close).toHaveBeenCalledOnce();
    });
  });
});
