import { HttpClient } from '@angular/common/http';
import { DOCUMENT, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { IMediaAttr } from '@core/interface/manage/IManage';
import { BuilderState } from '@core/state/BuilderState';
import { API_URL, USER } from '@core/token/token-providers';
import { firstValueFrom, of } from 'rxjs';
import { CommentService } from './comment.service';
import { NodeService } from './node.service';
import { UtilitiesService } from './utilities.service';

describe('NodeService media API', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    TestBed.resetTestingModule();
  });

  function createService(post = vi.fn(() => of({})), user: unknown = signal(true)) {
    const utilitiesService = {
      openSnackbar: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        NodeService,
        { provide: API_URL, useValue: 'https://example.com' },
        { provide: DOCUMENT, useValue: document },
        { provide: HttpClient, useValue: { post } },
        { provide: USER, useValue: user },
        { provide: UtilitiesService, useValue: utilitiesService },
        { provide: BuilderState, useValue: { currentPage: {} } },
        { provide: CommentService, useValue: {} },
      ],
    });

    return {
      service: TestBed.inject(NodeService),
      utilitiesService,
    };
  }

  it('uploads the file, creates its media entity, and returns the existing media shape', async () => {
    const fileData = {
      id: 'file-1',
      attributes: {
        filename: 'hero image.png',
        uri: { url: '/sites/default/files/hero-image.png' },
      },
    };
    const post = vi.fn((url: string, _body?: unknown, _options?: unknown) => {
      return url.endsWith('/field_media_image') ? of({ data: fileData }) : of({});
    });
    const { service } = createService(post);
    const createMediaImage = vi.spyOn(service, 'createMediaImage');
    const imageData = new ArrayBuffer(8);

    const result = await firstValueFrom(service.uploadImage('hero image.png', imageData));

    expect(result).toEqual({ ...fileData.attributes, uuid: 'file-1' });
    expect(createMediaImage).toHaveBeenCalledWith(fileData);
    expect(post).toHaveBeenNthCalledWith(
      1,
      '/api/v1/media/image/field_media_image',
      imageData,
      expect.any(Object)
    );
    const uploadOptions = post.mock.calls[0][2] as {
      headers: { get: (name: string) => string | null };
    };
    expect(uploadOptions.headers.get('Accept')).toBe('application/vnd.api+json');
    expect(uploadOptions.headers.get('Content-Type')).toBe('application/octet-stream');
    expect(uploadOptions.headers.get('Content-Disposition')).toBe(
      'file; filename="hero%20image.png"'
    );
    expect(post).toHaveBeenNthCalledWith(
      2,
      '/api/v1/media/image',
      {
        data: {
          type: 'media--image',
          attributes: { name: 'hero image.png' },
          relationships: {
            field_media_image: {
              data: { type: 'file--file', id: 'file-1' },
            },
          },
        },
      },
      expect.any(Object)
    );
  });

  it('keeps the Quill image handler file selection and insertion sequence', () => {
    const { service } = createService();
    const input = document.createElement('input');
    const file = new File(['image'], 'editor.png', { type: 'image/png' });
    Object.defineProperty(input, 'files', { value: [file] });
    vi.spyOn(document, 'createElement').mockReturnValue(input);
    vi.spyOn(input, 'click').mockImplementation(() => {
      input.dispatchEvent(new Event('change'));
    });

    class FileReaderStub {
      onload: ((event: { target: { result: ArrayBuffer } }) => void) | null = null;

      readAsArrayBuffer(): void {
        this.onload?.({ target: { result: new ArrayBuffer(4) } });
      }
    }

    vi.stubGlobal('FileReader', FileReaderStub);
    vi.spyOn(service, 'uploadImage').mockReturnValue(
      of({ uri: { url: '/sites/default/files/editor.png' } } as IMediaAttr)
    );
    const editor = {
      getSelection: vi.fn(() => ({ index: 3 })),
      insertEmbed: vi.fn(),
    };

    service.imageHandler(editor);

    expect(input.type).toBe('file');
    expect(input.accept).toBe('image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    expect(input.classList.contains('ql-image')).toBe(true);
    expect(service.uploadImage).toHaveBeenCalledWith('editor.png', expect.any(ArrayBuffer));
    expect(editor.getSelection).toHaveBeenCalledWith(true);
    expect(editor.insertEmbed).toHaveBeenCalledWith(3, 'image', '/sites/default/files/editor.png');
  });

  it('blocks the Quill image handler for signed-out visitors', () => {
    const { service, utilitiesService } = createService(undefined, signal(false));
    const createElement = vi.spyOn(document, 'createElement');
    const editor = { getSelection: vi.fn(), insertEmbed: vi.fn() };

    service.imageHandler(editor);

    expect(utilitiesService.openSnackbar).toHaveBeenCalledWith('请登录后上传图片！', 'ok');
    expect(createElement).not.toHaveBeenCalled();
  });
});
