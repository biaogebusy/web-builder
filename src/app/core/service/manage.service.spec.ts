import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CMS_CSRF_PROTECTION } from '@core/config/cms-http-context';
import { ManageService } from '@core/service/manage.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { API_URL } from '@core/token/token-providers';
import { lastValueFrom } from 'rxjs';

const createUtilMock = () => ({ openSnackbar: vi.fn() });

describe('ManageService', () => {
  let service: ManageService;
  let http: HttpTestingController;
  let util: ReturnType<typeof createUtilMock>;

  beforeEach(() => {
    util = createUtilMock();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: '' },
        { provide: UtilitiesService, useValue: util },
        { provide: DOCUMENT, useValue: document },
      ],
    });
    service = TestBed.inject(ManageService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('media endpoints', () => {
    it('deletes a media entity by uuid', async () => {
      const pending = lastValueFrom(service.deleteMedia('abc'));

      const req = http.expectOne('/api/v3/media/abc');
      expect(req.request.method).toBe('DELETE');
      expect(req.request.context.get(CMS_CSRF_PROTECTION)).toBe(true);
      req.flush({});

      await pending;
    });

    it('includes the source file when loading one image', async () => {
      const pending = lastValueFrom(service.getMediaImage('abc'));

      http
        .expectOne('/api/v3/media/abc/display')
        .flush({});

      await pending;
    });

    it('patches only the media name', async () => {
      const pending = lastValueFrom(service.updateMediaName('abc', '新名字'));

      const req = http.expectOne('/api/v3/media/abc');
      expect(req.request.method).toBe('PATCH');
      expect(req.request.context.get(CMS_CSRF_PROTECTION)).toBe(true);
      expect(req.request.body).toEqual({
        name: '新名字',
      });
      req.flush({});

      await pending;
    });
  });

});
