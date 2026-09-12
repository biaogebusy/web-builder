import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { BuilderWorkspaceComponent } from './builder-workspace.component';
import { BuilderToolbarComponent } from '../../toolbar/builder-toolbar/builder-toolbar.component';
import { BuilderVersionComponent } from '../../sidebar/builder-version/builder-version.component';
import { BuilderShowcaseComponent } from '../builder-showcase/builder-showcase.component';
import { BuilderListComponent } from '../builder-list/builder-list.component';

describe('BuilderWorkspaceComponent', () => {
  let component: BuilderWorkspaceComponent;
  let fixture: ComponentFixture<BuilderWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderWorkspaceComponent],
      providers: [provideRouter([]), ...provideBuilderMocks()],
    }).overrideComponent(BuilderWorkspaceComponent, {
      remove: {
        imports: [
          BuilderToolbarComponent,
          BuilderVersionComponent,
          BuilderShowcaseComponent,
          BuilderListComponent,
        ],
      },
      add: { schemas: [NO_ERRORS_SCHEMA] },
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderWorkspaceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('switches the editor theme without placing the page canvas inside that theme', () => {
    for (const mode of ['dark', 'light'] as const) {
      component.builder.themeMode.set(mode);
      fixture.detectChanges();

      const workspace: HTMLElement = fixture.nativeElement;
      expect(workspace.querySelector('.toolbar-host')?.classList.contains(`${mode}-theme`))
        .toBe(true);
      expect(workspace.querySelector('.sidebar')?.classList.contains(`${mode}-theme`)).toBe(true);
      expect(workspace.querySelector('.preview-content')?.closest('.light-theme, .dark-theme'))
        .toBeNull();
    }
  });
});
