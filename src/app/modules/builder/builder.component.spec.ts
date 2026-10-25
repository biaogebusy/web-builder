import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { BuilderComponent } from './builder.component';

@Component({ selector: 'app-builder-route-target', template: '' })
class RouteTargetComponent {}

describe('BuilderComponent', () => {
  let component: BuilderComponent;
  let fixture: ComponentFixture<BuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderComponent],
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
});
