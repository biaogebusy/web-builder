import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import {
  createNodeServiceMock,
  createUtilitiesServiceMock,
  provideCoreMocks,
} from '@core/testing/mocks';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { of } from 'rxjs';

import { UploadMediaComponent } from './upload-media.component';

describe('UploadMediaComponent', () => {
  let component: UploadMediaComponent;
  let fixture: ComponentFixture<UploadMediaComponent>;
  const uploaded = { name: 'hero.png', uri: { url: '/sites/default/files/hero.png' } };
  const nodeService = Object.assign(createNodeServiceMock(), {
    uploadImage: vi.fn(() => of(uploaded)),
  });
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
    await TestBed.configureTestingModule({
      imports: [UploadMediaComponent],
      providers: [
        provideRouter([]),
        ...provideCoreMocks(),
        { provide: NodeService, useValue: nodeService },
        { provide: UtilitiesService, useValue: util },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadMediaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uploads a dropped file and appends the returned media attributes', async () => {
    const file = new File(['image-bytes'], 'hero.png', { type: 'image/png' });

    await component.dropped([fileEntry(file)]);

    expect(nodeService.uploadImage).toHaveBeenCalledWith('hero.png', expect.any(ArrayBuffer));
    expect(component.files()).toEqual([uploaded]);
  });

  it('rejects directory entries with a snackbar hint', async () => {
    const entry = {
      relativePath: 'assets/',
      fileEntry: { isFile: false, isDirectory: true, name: 'assets' },
    } as unknown as NgxFileDropEntry;

    await component.dropped([entry]);

    expect(nodeService.uploadImage).not.toHaveBeenCalled();
    expect(util.openSnackbar).toHaveBeenCalledWith('不支持上传目录', 'ok');
  });

  it('copies the media url and confirms it', () => {
    component.onCopy('/sites/default/files/hero.png');

    expect(util.copy).toHaveBeenCalledWith('/sites/default/files/hero.png');
    expect(util.openSnackbar).toHaveBeenCalledWith('已复制图片地址', 'ok');
  });
});
