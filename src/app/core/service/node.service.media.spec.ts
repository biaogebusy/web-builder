import { HttpClient } from '@angular/common/http';
import { DOCUMENT, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { IMediaUploadResult } from '@core/interface/manage/IManage';
import { BuilderState } from '@core/state/BuilderState';
import { API_URL, USER } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, of, Observable } from 'rxjs';
import { CommentService } from './comment.service';
import { NodeService } from './node.service';
import { UtilitiesService } from './utilities.service';

describe('NodeService media API', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    TestBed.resetTestingModule();
  });

  function createService(
    post: (url: string, body?: unknown, options?: unknown) => Observable<unknown> = vi.fn(() => of({})),
    user: unknown = signal(true)
  ) {
    const utilitiesService = {
      openSnackbar: vi.fn(),
      dismissSnackbar: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        NodeService,
        { provide: API_URL, useValue: 'https://example.com' },
        { provide: DOCUMENT, useValue: document },
        { provide: HttpClient, useValue: { post } },
        { provide: USER, useValue: user },
        { provide: UtilitiesService, useValue: utilitiesService },
        { provide: TranslateService, useValue: { instant: (key: string) => key } },
        { provide: BuilderState, useValue: { currentPage: {} } },
        { provide: CommentService, useValue: {} },
      ],
    });

    return {
      service: TestBed.inject(NodeService),
      utilitiesService,
    };
  }

  it('returns the completed catalog identities through the shared upload service', async () => {
    const post = vi.fn(() => of({ uuid: 'media-1', fileId: 'file-1', source: '/hero.png' }));
    const { service } = createService(post);
    const result = await firstValueFrom(service.uploadImage('hero.png', new ArrayBuffer(8)));
    expect(result).toMatchObject({ uuid: 'media-1', mediaId: 'media-1', fileId: 'file-1' });
    expect(post).toHaveBeenCalledTimes(1);
  });

  it('keeps the editor image picker file selection and insertion sequence', () => {
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
      of({ uri: { url: '/sites/default/files/editor.png' } } as IMediaUploadResult)
    );
    const insert = vi.fn();

    service.pickAndUploadImage(insert);

    expect(input.type).toBe('file');
    expect(input.accept).toBe('image/png,image/gif,image/jpeg,image/webp,image/svg+xml');
    expect(service.uploadImage).toHaveBeenCalledWith('editor.png', expect.any(ArrayBuffer));
    expect(insert).toHaveBeenCalledWith('/sites/default/files/editor.png');
  });

  it('blocks the editor image picker for signed-out visitors', () => {
    const { service, utilitiesService } = createService(undefined, signal(false));
    const createElement = vi.spyOn(document, 'createElement');

    service.pickAndUploadImage(vi.fn());

    expect(utilitiesService.openSnackbar).toHaveBeenCalledWith(
      'BUILDER.FORM_EDITOR.IMAGE_LOGIN_REQUIRED',
      'ok'
    );
    expect(createElement).not.toHaveBeenCalled();
  });
});
