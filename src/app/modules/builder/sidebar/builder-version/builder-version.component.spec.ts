import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderService } from '@core/service/builder.service';
import { BuilderState } from '@core/state/BuilderState';
import {
  createBuilderServiceMock,
  createBuilderStateMock,
  createStorageServiceMock,
} from '@core/testing/mocks';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';

import { BuilderVersionComponent } from './builder-version.component';

describe('BuilderVersionComponent', () => {
  let component: BuilderVersionComponent;
  let fixture: ComponentFixture<BuilderVersionComponent>;
  const builderState = createBuilderStateMock();
  const builderService = createBuilderServiceMock();
  const versionChange$ = new Subject<IPage[]>();
  const storage = Object.assign(createStorageServiceMock(), {
    retrieve: vi.fn(() => [{ title: '本地版本' }]),
    observe: vi.fn(() => versionChange$),
  });

  beforeEach(async () => {
    vi.clearAllMocks();
    builderState.version = signal<IPage[]>([{ title: 'v1', body: [] }, { title: 'v2', body: [] }]);
    await TestBed.configureTestingModule({
      imports: [BuilderVersionComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: BuilderState, useValue: builderState },
        { provide: BuilderService, useValue: builderService },
        { provide: LocalStorageService, useValue: storage },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads versions from local storage and follows storage changes', () => {
    expect(storage.retrieve).toHaveBeenCalledWith('version');
    expect(component.version).toEqual([{ title: '本地版本' }]);

    versionChange$.next([{ title: '新版本', body: [] }]);

    expect(component.version).toEqual([{ title: '新版本', body: [] }]);
  });

  it('switches the version and checks whether it is the latest page', () => {
    const page = { title: 'v2', body: [] };

    component.onVersion(page, 1);

    expect(builderState.switchVersion).toHaveBeenCalledWith(page, 1);
    expect(builderService.checkIsLatestPage).toHaveBeenCalledWith(page);
  });

  it('deletes the local page at the index', () => {
    component.onDelete(0);

    expect(builderState.deleteLocalPage).toHaveBeenCalledWith(0);
  });

  it('renames the version title and persists the local versions', () => {
    component.onUpdateTitle({ target: { textContent: '首页改版' } }, 0);

    expect(builderState.version()[0].title).toBe('首页改版');
    expect(builderState.version()[1].title).toBe('v2');
    expect(builderState.saveLocalVersions).toHaveBeenCalled();
  });

  it('keeps the title unchanged when the edited text is empty', () => {
    component.onUpdateTitle({ target: { textContent: '' } }, 0);

    expect(builderState.version()[0].title).toBe('v1');
    expect(builderState.saveLocalVersions).not.toHaveBeenCalled();
  });
});
