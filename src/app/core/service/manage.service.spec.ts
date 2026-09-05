import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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

      const req = http.expectOne('/api/v1/media/image/abc');
      expect(req.request.method).toBe('DELETE');
      req.flush({});

      await pending;
    });

    it('includes the source file when loading one image', async () => {
      const pending = lastValueFrom(service.getMediaImage('abc'));

      http
        .expectOne('/api/v1/media/image/abc?include=field_media_image&fields[file--file]=uri')
        .flush({});

      await pending;
    });

    it('patches only the media name', async () => {
      const pending = lastValueFrom(service.updateMediaName('abc', '新名字'));

      const req = http.expectOne('/api/v1/media/image/abc');
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual({
        data: { type: 'media--image', id: 'abc', attributes: { name: '新名字' } },
      });
      req.flush({});

      await pending;
    });
  });

  describe('getUrlIncluded', () => {
    const item = { relationships: { field_media_image: { data: { id: 'file-1' } } } };
    const included = [{ id: 'file-1', attributes: { uri: { url: '/files/hero.png' } } }];

    it('resolves the file url from the included section', () => {
      expect(service.getUrlIncluded(item, included)).toBe('/files/hero.png');
    });

    it('returns an empty string when the relationship is missing', () => {
      expect(service.getUrlIncluded({}, included)).toBe('');
    });

    it('returns an empty string when the file is not included', () => {
      expect(service.getUrlIncluded(item, [])).toBe('');
      expect(service.getUrlIncluded(item, undefined as never)).toBe('');
    });
  });

  describe('handlerJsonApiParams', () => {
    it('always disables the cache and echoes the requested type', () => {
      const { type, params } = service.handlerJsonApiParams({ type: 'file' });

      expect(type).toBe('file');
      expect(params).toContain('noCache=true');
    });

    it('maps limit, status filter and sort direction', () => {
      const { params } = service.handlerJsonApiParams({
        type: 'file',
        limit: 20,
        filter: 1,
        sort: { direction: 'DESC' },
      });

      expect(params).toContain('page[limit]=20');
      expect(params).toContain('filter[status]=1');
      expect(params).toContain('sort=-created');
    });

    it('searches files by filename', () => {
      const { params } = service.handlerJsonApiParams({ type: 'file', key: 'hero' });

      expect(params).toContain('filter[filename][value]=hero');
      expect(params).toContain('filter[filename][operator]=CONTAINS');
    });

    it('includes the source file and searches by name for the image library', () => {
      const { params } = service.handlerJsonApiParams({ type: 'image', key: 'hero' });

      expect(params).toContain('include=field_media_image');
      expect(params).toContain('fields[file--file]=uri');
      expect(params).toContain('filter[name][value]=hero');
    });

    it('warns that document and video libraries are unfinished', () => {
      service.handlerJsonApiParams({ type: 'document' });
      service.handlerJsonApiParams({ type: 'video' });

      expect(util.openSnackbar).toHaveBeenCalledTimes(2);
    });
  });
});
