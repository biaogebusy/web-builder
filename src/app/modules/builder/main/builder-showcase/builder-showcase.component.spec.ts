import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import {
  createBuilderStateMock,
  createNodeServiceMock,
  createScreenServiceMock,
  createStorageServiceMock,
  createUtilitiesServiceMock,
} from '@core/testing/mocks';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { LocalStorageService } from 'ngx-webstorage';
import { of, throwError } from 'rxjs';

import { BuilderShowcaseComponent } from './builder-showcase.component';

describe('BuilderShowcaseComponent', () => {
  let component: BuilderShowcaseComponent;
  let fixture: ComponentFixture<BuilderShowcaseComponent>;
  const builderState = Object.assign(createBuilderStateMock(), {
    currentPage: { title: '', body: [{ type: 'text' }, { type: 'btn' }] },
  });
  const nodeService = createNodeServiceMock();
  const util = createUtilitiesServiceMock();
  const storage = createStorageServiceMock();
  const screenService = createScreenServiceMock();

  // MatDialog 来自组件 standalone imports 内的模块,须 spy 实际实例
  const confirmWith = (result: boolean) => {
    const dialog = fixture.debugElement.injector.get(MatDialog);
    return vi
      .spyOn(dialog, 'open')
      .mockReturnValue({ afterClosed: () => of(result) } as unknown as MatDialogRef<unknown>);
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [BuilderShowcaseComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: BuilderState, useValue: builderState },
        { provide: NodeService, useValue: nodeService },
        { provide: UtilitiesService, useValue: util },
        { provide: LocalStorageService, useValue: storage },
        { provide: ScreenService, useValue: screenService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderShowcaseComponent);
    fixture.componentRef.setInput('content', { title: '', card: {} });
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('copies the component json and keeps it on the clipboard key', () => {
    const widget = { type: 'hero-1v1', content: {} };

    component.onCopy(widget);

    expect(util.copy).toHaveBeenCalledWith(JSON.stringify(widget));
    expect(storage.store).toHaveBeenCalledWith(builderState.COPYCOMPONENTKEY, widget);
    expect(util.openSnackbar).toHaveBeenCalled();
  });

  it('ignores deletion for widgets without a uuid', () => {
    const openSpy = confirmWith(true);

    component.onDelete({ type: 'hero-1v1' } as never);

    expect(openSpy).not.toHaveBeenCalled();
    expect(nodeService.deleteEntity).not.toHaveBeenCalled();
  });

  it('deletes the widget after confirmation and collapses the showcase', () => {
    confirmWith(true);

    component.onDelete({ uuid: 'w-1', type: 'hero-1v1' } as never);

    expect(nodeService.deleteEntity).toHaveBeenCalledWith('/api/v1/node/component', 'w-1');
    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.SHOWCASE.DELETED', 'ok');
    expect(builderState.cancelFixedShowcase).toHaveBeenCalled();
    expect(component.deleting()).toBe(false);
  });

  it('keeps the widget when the confirm dialog is cancelled', () => {
    confirmWith(false);

    component.onDelete({ uuid: 'w-1', type: 'hero-1v1' } as never);

    expect(nodeService.deleteEntity).not.toHaveBeenCalled();
  });

  it('reports a failed deletion without collapsing the showcase', () => {
    confirmWith(true);
    nodeService.deleteEntity.mockReturnValueOnce(throwError(() => new Error('403')));

    component.onDelete({ uuid: 'w-1', type: 'hero-1v1' } as never);

    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.SHOWCASE.DELETE_FAILED', 'ok');
    expect(builderState.cancelFixedShowcase).not.toHaveBeenCalled();
    expect(component.deleting()).toBe(false);
  });

  it('inserts the component and scrolls to it before closing the showcase', () => {
    vi.useFakeTimers();
    const widget = { type: 'hero-1v1', content: {} };

    component.insert(widget);
    expect(builderState.pushComponent).toHaveBeenCalledWith(widget);

    vi.advanceTimersByTime(200);

    expect(screenService.scrollToAnchor).toHaveBeenCalledWith('item-1');
    expect(builderState.cancelFixedShowcase).toHaveBeenCalled();
    expect(builderState.currentShowcase()).toBe(false);
  });
});
