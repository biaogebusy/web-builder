import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_URL } from '@core/token/token-providers';
import { firstValueFrom } from 'rxjs';
import { CommentService } from './comment.service';
import { MediaUploadService } from './media-upload.service';
import { NodeService } from './node.service';

describe.each(['POST', 'PATCH'] as const)('NodeService entity %s', method => {
  const apiUrl = 'https://cms.example.test';
  const nodePath = '/api/v1/node/article';
  let service: NodeService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: apiUrl },
        { provide: CommentService, useValue: {} },
        { provide: MediaUploadService, useValue: {} },
      ],
    });
    service = TestBed.inject(NodeService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    try {
      http.verify();
    } finally {
      TestBed.resetTestingModule();
    }
  });

  function write(
    attributes: Record<string, unknown>,
    relationships?: Record<string, unknown> | null,
    lang?: string,
    path = nodePath,
    uuid = 'entity-1'
  ) {
    return method === 'POST'
      ? service.addEntity(path, attributes, relationships, lang)
      : service.updateEntity(path, uuid, attributes, relationships, lang);
  }

  it.each([
    [nodePath, 'node--article', undefined, ''],
    ['/api/v1/taxonomy_term/tags', 'taxonomy_term--tags', undefined, ''],
    [nodePath, 'node--article', 'en', '/en'],
    ['/api/v1/taxonomy_term/tags', 'taxonomy_term--tags', '', ''],
  ])('preserves the request and response for %s in %s (%s)', async (path, type, lang, prefix) => {
    const attributes = Object.freeze({ title: 'Draft "A"', status: false, weight: 0, summary: null });
    const reference = Object.freeze({ type: 'taxonomy_term--tags', id: 'term-1' });
    const relationships = Object.freeze({
      field_tags: Object.freeze({ data: Object.freeze([reference]) }),
      field_image: Object.freeze({ data: null }),
    });
    const result = firstValueFrom(write(attributes, relationships, lang, path));
    const suffix = method === 'PATCH' ? '/entity-1' : '';
    const request = http.expectOne(`${apiUrl}${prefix}${path}${suffix}`);

    expect(request.request.method).toBe(method);
    expect(request.request.headers.get('Accept')).toBe('application/vnd.api+json');
    expect(request.request.headers.get('Content-Type')).toBe('application/vnd.api+json');
    expect(typeof request.request.body).toBe('string');
    expect(JSON.parse(request.request.body)).toEqual({
      data: {
        type,
        ...(method === 'PATCH' ? { id: 'entity-1' } : {}),
        attributes: { title: 'Draft "A"', status: false, weight: 0, summary: null },
        relationships: {
          field_tags: { data: [{ type: 'taxonomy_term--tags', id: 'term-1' }] },
          field_image: { data: null },
        },
      },
    });
    expect(attributes).toEqual({ title: 'Draft "A"', status: false, weight: 0, summary: null });
    expect(relationships.field_tags.data).toEqual([reference]);
    expect(relationships.field_image.data).toBeNull();

    const response = { data: { type, id: 'entity-1' }, meta: { saved: true } };
    request.flush(response);
    await expect(result).resolves.toBe(response);
  });

  it.each([undefined, null, {}])('omits empty relationships: %j', async relationships => {
    const result = firstValueFrom(write({ title: 'Empty relationships' }, relationships));
    const request = http.expectOne(req => req.method === method);
    const id = method === 'PATCH' ? ',"id":"entity-1"' : '';
    expect(request.request.body).toBe(
      `{"data":{"type":"node--article"${id},"attributes":{"title":"Empty relationships"}}}`
    );
    request.flush({});
    await result;
  });

  it.each([403, 409])('passes through HTTP %s without retrying', async status => {
    const result = firstValueFrom(write({ title: 'Rejected' }));
    const failure = expect(result).rejects.toMatchObject({
      status,
      error: { errors: [{ detail: 'CMS rejected the write' }] },
    });
    const request = http.expectOne(req => req.method === method);
    request.flush(
      { errors: [{ detail: 'CMS rejected the write' }] },
      { status, statusText: 'Rejected' }
    );
    await failure;
  });

  if (method === 'PATCH') {
    it('preserves an explicitly empty update id', async () => {
      const result = firstValueFrom(write({}, undefined, undefined, nodePath, ''));
      const request = http.expectOne(`${apiUrl}${nodePath}/`);
      expect(request.request.body).toBe(
        '{"data":{"type":"node--article","id":"","attributes":{}}}'
      );
      request.flush({});
      await result;
    });
  }
});
