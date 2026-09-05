import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DOCUMENT, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MediaUploadService } from '@core/service/media-upload.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { API_URL, USER } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom, of, throwError } from 'rxjs';

const createUtilMock = () => ({
  openSnackbar: vi.fn(),
  dismissSnackbar: vi.fn(),
});

describe('MediaUploadService', () => {
  let service: MediaUploadService;
  let http: HttpTestingController;
  let util: ReturnType<typeof createUtilMock>;
  let user: ReturnType<typeof signal<unknown>>;

  const fileResponse = {
    data: {
      id: 'file-uuid',
      attributes: { filename: 'hero.png', uri: { url: '/files/hero.png' } },
    },
  };

  beforeEach(() => {
    util = createUtilMock();
    user = signal<unknown>({ uid: 1 });
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: '' },
        { provide: USER, useValue: user },
        { provide: UtilitiesService, useValue: util },
        { provide: TranslateService, useValue: { instant: (key: string) => key } },
        { provide: DOCUMENT, useValue: document },
      ],
    });
    service = TestBed.inject(MediaUploadService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('uploadImage', () => {
    it('posts the binary with a content-disposition filename', async () => {
      const createMediaImage = vi.fn(() => of(void 0));
      const pending = lastValueFrom(
        service.uploadImage('英雄 图.png', new ArrayBuffer(8), createMediaImage)
      );

      const req = http.expectOne('/api/v1/media/image/field_media_image');
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Content-Disposition')).toBe(
        `file; filename="${encodeURIComponent('英雄 图.png')}"`
      );
      req.flush(fileResponse);

      // The media entity is created from the uploaded file before the caller is served
      expect(createMediaImage).toHaveBeenCalledWith(fileResponse.data);
      await expect(pending).resolves.toEqual({
        filename: 'hero.png',
        uri: { url: '/files/hero.png' },
        uuid: 'file-uuid',
      });
    });

    it('propagates an upload failure', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const pending = lastValueFrom(service.uploadImage('hero.png', new ArrayBuffer(8), () => of()));

      http
        .expectOne('/api/v1/media/image/field_media_image')
        .flush('boom', { status: 500, statusText: 'Server Error' });

      await expect(pending).rejects.toBeTruthy();
    });

    it('propagates a media-creation failure', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const pending = lastValueFrom(
        service.uploadImage('hero.png', new ArrayBuffer(8), () =>
          throwError(() => new Error('create failed'))
        )
      );

      http.expectOne('/api/v1/media/image/field_media_image').flush(fileResponse);

      await expect(pending).rejects.toThrow('create failed');
    });
  });

  describe('createMediaImage', () => {
    it('links the uploaded file to a new media entity', async () => {
      const pending = lastValueFrom(service.createMediaImage(fileResponse.data));

      const req = http.expectOne('/api/v1/media/image');
      expect(req.request.body).toEqual({
        data: {
          type: 'media--image',
          attributes: { name: 'hero.png' },
          relationships: {
            field_media_image: { data: { type: 'file--file', id: 'file-uuid' } },
          },
        },
      });
      req.flush({});

      await expect(pending).resolves.toBeUndefined();
    });

    it('propagates the failure to the caller', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const pending = lastValueFrom(service.createMediaImage(fileResponse.data));

      http.expectOne('/api/v1/media/image').flush('boom', { status: 403, statusText: 'Forbidden' });

      await expect(pending).rejects.toBeTruthy();
    });
  });

  describe('pickAndUploadImage', () => {
    it('asks an anonymous visitor to log in instead of opening the picker', () => {
      user.set(false);
      const insert = vi.fn();

      service.pickAndUploadImage(insert);

      expect(util.openSnackbar).toHaveBeenCalledWith(
        'BUILDER.FORM_EDITOR.IMAGE_LOGIN_REQUIRED',
        'ok'
      );
      expect(insert).not.toHaveBeenCalled();
    });

    it('inserts the uploaded url and dismisses the progress hint', async () => {
      const insert = vi.fn();
      const upload = vi.fn(() => of({ uri: { url: '/files/hero.png' } }) as never);
      const input = captureFileInput();

      service.pickAndUploadImage(insert, upload);
      await input.select(new File(['x'], 'hero.png', { type: 'image/png' }));

      expect(util.openSnackbar).toHaveBeenCalledWith(
        'BUILDER.FORM_EDITOR.IMAGE_UPLOADING',
        '',
        { duration: 0 }
      );
      expect(upload).toHaveBeenCalledWith('hero.png', expect.anything());
      expect(util.dismissSnackbar).toHaveBeenCalled();
      expect(insert).toHaveBeenCalledWith('/files/hero.png');
    });

    it('keeps a retry hint when the upload fails', async () => {
      const insert = vi.fn();
      const upload = vi.fn(() => throwError(() => new Error('boom'))) as never;
      const input = captureFileInput();

      service.pickAndUploadImage(insert, upload);
      await input.select(new File(['x'], 'hero.png', { type: 'image/png' }));

      expect(insert).not.toHaveBeenCalled();
      expect(util.openSnackbar).toHaveBeenLastCalledWith(
        'BUILDER.FORM_EDITOR.IMAGE_UPLOAD_FAILED',
        'ok'
      );
    });
  });
});

/**
 * The service creates its own `<input type="file">` and clicks it. Intercept that
 * element so the test can drive the change/FileReader flow.
 */
function captureFileInput(): { select: (file: File) => Promise<void> } {
  const input = document.createElement('input');
  vi.spyOn(document, 'createElement').mockReturnValue(input as never);
  vi.spyOn(input, 'click').mockImplementation(() => undefined);
  // jsdom reports an empty FileList; the service only proceeds when `files` is truthy
  const files: File[] = [];
  Object.defineProperty(input, 'files', { get: () => files });

  return {
    select: async (file: File) => {
      files[0] = file;
      input.dispatchEvent(new Event('change'));
      // Let the FileReader onload callback and the upload subscription run
      await new Promise(resolve => setTimeout(resolve, 50));
    },
  };
}
