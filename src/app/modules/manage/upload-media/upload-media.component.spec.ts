import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MediaLibraryService } from '@core/service/media-library.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { USER } from '@core/token/token-providers';
import {
  createNodeServiceMock,
  createUtilitiesServiceMock,
  provideCoreMocks,
} from '@core/testing/mocks';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { of, Subject, throwError } from 'rxjs';

import { UploadMediaComponent } from './upload-media.component';

describe('UploadMediaComponent', () => {
  let component: UploadMediaComponent;
  let fixture: ComponentFixture<UploadMediaComponent>;
  const uploaded = { uuid: 'media-1', fileId: 'file-1', src: '/hero.png', source: '/hero.png' };
  const user = signal<unknown>({ id: 'u-1' });
  const nodeService = {
    upload: vi.fn((_bundle: string, _name: string, _data: ArrayBuffer) => of(uploaded)),
    capabilities: vi.fn(() => of({ types: [
      { bundle: 'image', extensions: ['png'], maxBytes: 10000, canUpload: true },
      { bundle: 'vector', extensions: ['svg'], maxBytes: 10000, canUpload: true },
      { bundle: 'document', extensions: ['txt'], maxBytes: 10000, canUpload: true },
    ], canViewAll: false })),
  };
  const util = createUtilitiesServiceMock();

  const fileEntry = (file: File): NgxFileDropEntry =>
    ({
      relativePath: file.name,
      fileEntry: {
        isFile: true,
        isDirectory: false,
        name: file.name,
        file: (cb: (f: File) => void) => cb(file),
      },
    }) as unknown as NgxFileDropEntry;

  beforeEach(async () => {
    vi.clearAllMocks();
    user.set({ id: 'u-1' });
    await TestBed.configureTestingModule({
      imports: [UploadMediaComponent],
      providers: [
        provideRouter([]),
        ...provideCoreMocks(),
        { provide: MediaLibraryService, useValue: nodeService },
        { provide: UtilitiesService, useValue: util },
        { provide: USER, useValue: user },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('asks signed-out visitors to log in before uploading', async () => {
    user.set(false);
    const file = new File(['image-bytes'], 'hero.png', { type: 'image/png' });

    await component.dropped([fileEntry(file)]);

    expect(util.openSnackbar).toHaveBeenCalledWith('MANAGE.MEDIA.UPLOAD_LOGIN', 'ok');
    expect(nodeService.upload).not.toHaveBeenCalled();
  });

  it('uploads a dropped file and appends the returned media attributes', async () => {
    const file = new File(['image-bytes'], 'hero.png', { type: 'image/png' });

    await component.dropped([fileEntry(file)]);

    expect(nodeService.upload).toHaveBeenCalledWith('image', 'hero.png', expect.any(ArrayBuffer));
    expect(component.files()).toEqual([uploaded]);
  });

  it('rejects directory entries with a snackbar hint', async () => {
    const entry = {
      relativePath: 'assets/',
      fileEntry: { isFile: false, isDirectory: true, name: 'assets' },
    } as unknown as NgxFileDropEntry;

    await component.dropped([entry]);

    expect(nodeService.upload).not.toHaveBeenCalled();
    expect(component.uploads()[0]).toMatchObject({
      status: 'failed', error: 'MANAGE.MEDIA.UPLOAD_DIRECTORY',
    });
  });

  it('keeps a failed first row separate from the next successful file', async () => {
    nodeService.upload.mockReturnValueOnce(throwError(() => new Error('denied')));
    const first = new File(['a'], 'first.png', { type: 'image/png' });
    const second = new File(['b'], 'second.png', { type: 'image/png' });
    await component.dropped([fileEntry(first), fileEntry(second)]);
    expect(nodeService.upload).toHaveBeenCalledTimes(2);
    expect(component.uploads()[0]).toMatchObject({ status: 'failed' });
    expect(component.uploads()[0].media).toBeUndefined();
    expect(component.uploads()[1]).toMatchObject({
      status: 'complete', entry: { relativePath: 'second.png' }, media: uploaded,
    });
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('.table-row');
    expect(rows[0].querySelector('img')).toBeNull();
    expect(rows[1].querySelector('img')).not.toBeNull();
  });

  it('appends subsequent drops without replacing completed rows', async () => {
    await component.dropped([fileEntry(new File(['a'], 'a.png', { type: 'image/png' }))]);
    await component.dropped([fileEntry(new File(['b'], 'b.png', { type: 'image/png' }))]);
    expect(component.uploads().map(row => row.entry.relativePath)).toEqual(['a.png', 'b.png']);
    expect(component.files()).toHaveLength(2);
  });

  it('rejects unsupported source formats before sending bytes', async () => {
    await component.dropped([fileEntry(new File(['x'], 'app.exe', { type: 'application/octet-stream' }))]);
    expect(nodeService.upload).not.toHaveBeenCalled();
    expect(component.uploads()[0]).toMatchObject({ status: 'failed', error: 'MANAGE.MEDIA.UPLOAD_FORMAT' });
  });

  it('discards old-account results and invalidates media creation', async () => {
    const response = new Subject<typeof uploaded>();
    nodeService.upload.mockReturnValueOnce(response);
    const pending = component.dropped([fileEntry(new File(['a'], 'a.png', { type: 'image/png' }))]);
    await vi.waitFor(() => expect(nodeService.upload).toHaveBeenCalled());
    user.set({ id: 'u-2' });
    fixture.detectChanges();
    response.next(uploaded);
    response.complete();
    await pending;
    expect(component.files()).toEqual([]);
  });

  it('uses capabilities to upload SVG and documents through their own bundles', async () => {
    await component.dropped([
      fileEntry(new File(['<svg/>'], 'logo.svg', { type: 'image/svg+xml' })),
      fileEntry(new File(['notes'], 'notes.txt', { type: 'text/plain' })),
    ]);
    expect(nodeService.upload.mock.calls.map(call => call[0])).toEqual(['vector', 'document']);
  });

  it('copies the media url and confirms it', () => {
    component.onCopy('/sites/default/files/hero.png');

    expect(util.copy).toHaveBeenCalledWith('/sites/default/files/hero.png');
    expect(util.openSnackbar).toHaveBeenCalledWith('MANAGE.MEDIA.PATH_COPIED', 'ok');
  });
});
