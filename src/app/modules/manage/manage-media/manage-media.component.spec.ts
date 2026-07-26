import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { ManageService } from '@core/service/manage.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { ContentState } from '@core/state/ContentState';
import {
  createManageServiceMock,
  createMatDialogMock,
  createUtilitiesServiceMock,
  provideCoreMocks,
} from '@core/testing/mocks';
import { of } from 'rxjs';

import { ManageMediaComponent } from './manage-media.component';

describe('ManageMediaComponent', () => {
  let component: ManageMediaComponent;
  let fixture: ComponentFixture<ManageMediaComponent>;
  let contentState: ContentState;
  let searchChanges: unknown[];
  const manageService = createManageServiceMock();
  const dialog = createMatDialogMock();
  const util = createUtilitiesServiceMock();

  const confirmWith = (result: boolean) =>
    dialog.open.mockReturnValueOnce({ afterClosed: () => of(result) } as never);

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [ManageMediaComponent],
      providers: [
        provideRouter([]),
        ...provideCoreMocks(),
        { provide: ManageService, useValue: manageService },
        { provide: MatDialog, useValue: dialog },
        { provide: UtilitiesService, useValue: util },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageMediaComponent);
    fixture.componentRef.setInput('content', { mode: '', time: '' });
    component = fixture.componentInstance;
    contentState = TestBed.inject(ContentState);
    searchChanges = [];
    contentState.mediaAssetsFormChange$.subscribe(value => searchChanges.push(value));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('warns about the missing uuid instead of opening the confirm dialog', () => {
    component.onDelete('');

    expect(util.openSnackbar).toHaveBeenCalledWith('MANAGE.MEDIA.MISSING_UUID', 'ok');
    expect(dialog.open).not.toHaveBeenCalled();
    expect(manageService.deleteMedia).not.toHaveBeenCalled();
  });

  it('deletes the media after confirmation and refreshes the asset search', () => {
    confirmWith(true);

    component.onDelete('media-1');

    expect(manageService.deleteMedia).toHaveBeenCalledWith('media-1');
    expect(searchChanges).toEqual([component.form.value]);
  });

  it('keeps the media when the confirm dialog is cancelled', () => {
    confirmWith(false);

    component.onDelete('media-1');

    expect(manageService.deleteMedia).not.toHaveBeenCalled();
    expect(searchChanges).toEqual([]);
  });

  it('bulk-deletes sequentially, reports full progress and resets the selection', () => {
    confirmWith(true);
    component.deletedLists = ['media-1', 'media-2'];

    component.bulkDelete(component.deletedLists);

    expect(manageService.deleteMedia).toHaveBeenNthCalledWith(1, 'media-1');
    expect(manageService.deleteMedia).toHaveBeenNthCalledWith(2, 'media-2');
    expect(component.progress).toBe(100);
    expect(util.openSnackbar).toHaveBeenCalledWith('MANAGE.MEDIA.ALL_DELETED', 'ok');
    expect(component.deletedLists).toEqual([]);
    expect(searchChanges).toEqual([component.form.value]);
  });
});
