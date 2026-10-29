import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderService } from '@core/service/builder.service';
import { BuilderState } from '@core/state/BuilderState';
import { createBuilderServiceMock, createBuilderStateMock } from '@core/testing/mocks';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';

import { BuilderVersionComponent } from './builder-version.component';

describe('BuilderVersionComponent', () => {
  let component: BuilderVersionComponent;
  let fixture: ComponentFixture<BuilderVersionComponent>;
  const builderState = createBuilderStateMock();
  const builderService = createBuilderServiceMock();

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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders versions from the BuilderState signal and follows changes', () => {
    expect(component.version()).toEqual([
      { title: 'v1', body: [] },
      { title: 'v2', body: [] },
    ]);
    expect(fixture.nativeElement.textContent).toContain('v1');

    builderState.version.set([{ title: '新版本', body: [] }]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('新版本');
    expect(fixture.nativeElement.textContent).not.toContain('v1');
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

  it('deletes through the native button without selecting or checking a version', async () => {
    await fixture.whenStable();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('app-btn.delete button');

    button.click();
    await fixture.whenStable();

    expect(builderState.deleteLocalPage).toHaveBeenCalledExactlyOnceWith(1);
    expect(builderState.switchVersion).not.toHaveBeenCalled();
    expect(builderService.checkIsLatestPage).not.toHaveBeenCalled();
  });

  it('still selects and checks a version when its row is clicked', async () => {
    await fixture.whenStable();
    const row: HTMLElement = fixture.nativeElement.querySelectorAll('mat-list-item')[1];

    row.click();
    await fixture.whenStable();

    const page = builderState.version()[1];
    expect(builderState.switchVersion).toHaveBeenCalledExactlyOnceWith(page, 1);
    expect(builderService.checkIsLatestPage).toHaveBeenCalledExactlyOnceWith(page);
    expect(builderState.deleteLocalPage).not.toHaveBeenCalled();
  });

  it('renames the version title and persists the local versions', () => {
    component.onUpdateTitle({ target: { textContent: '首页改版' } }, 0);

    expect(builderState.version()[0].title).toBe('首页改版');
    expect(builderState.version()[0].dirty).toBe(true);
    expect(builderState.version()[1].title).toBe('v2');
    expect(builderState.saveLocalVersions).toHaveBeenCalled();
  });

  it('keeps the title unchanged when the edited text is empty', () => {
    component.onUpdateTitle({ target: { textContent: '' } }, 0);

    expect(builderState.version()[0].title).toBe('v1');
    expect(builderState.saveLocalVersions).not.toHaveBeenCalled();
  });
});
