import { EnvironmentInjector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import { ManageService } from '@core/service/manage.service';

import { ImgPickerComponent } from './img-picker.component';

describe('ImgPickerComponent', () => {
  let component: ImgPickerComponent;
  let fixture: ComponentFixture<ImgPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgPickerComponent],
      providers: [provideRouter([]), ...provideUiuxMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(ImgPickerComponent);
    component = fixture.componentInstance;
    component.field = {
      key: 'k',
      props: { options: [] },
      formControl: new UntypedFormControl(),
      formState: {},
      options: { showError: () => false },
    } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens the media library with an environment injector', () => {
    const dialog = TestBed.inject(MatDialog) as unknown as { open: { mock: { calls: any[][] } } };

    component.openMedias();

    // ManageMediaComponent resolves route-level tokens (BUILDER_CONFIG / MEDIA_ASSETS)
    // through the dialog's injector. Without an explicit one it depends on some ancestor
    // happening to import MatDialogModule, and breaks with NG0201 wherever none does.
    expect(dialog.open.mock.calls[0][1].injector).toBeInstanceOf(EnvironmentInjector);
  });

  it('restricts UUID fields to image media and URL fields to web images', () => {
    const dialog = TestBed.inject(MatDialog) as any;
    component.field.props = { valueIsUUID: true };
    component.openMedias();
    expect(dialog.open.mock.lastCall[1].data.inputData.content.purpose).toBe('image-media');
    component.field.props = {};
    component.openMedias();
    expect(dialog.open.mock.lastCall[1].data.inputData.content.purpose).toBe('web-image');
    component.field.props = { valueIsUUID: true, mediaPurpose: 'raster-image' };
    component.openMedias();
    expect(dialog.open.mock.lastCall[1].data.inputData.content.purpose).toBe('raster-image');
  });

  it('rejects a vector UUID even if an incompatible event reaches the field', () => {
    component.field.props = { valueIsUUID: true };
    component.ngOnInit();
    component.openMedias();
    component.builder.selectedMedia$.next({
      img: { src: '/logo.svg', uuid: 'vector-1', bundle: 'vector', tag: 'img', alt: '', fileName: '' },
      time: component.time,
      value: { type: 'manage-media', time: component.time },
    });
    expect(component.formControl.value).toBeNull();
  });

  it('resolves a backfilled media UUID into a preview URL and file meta', () => {
    const manageService = TestBed.inject(ManageService) as any;
    manageService.getMediaImage.mockReturnValue(of({
      src: '/sites/default/files/cover.jpg', alt: '封面',
    }));
    component.field = {
      key: 'field_image',
      props: { valueIsUUID: true },
      formControl: new UntypedFormControl('d9b1c290-8a7e-4f9e-9d3e-1a2b3c4d5e6f'),
      formState: {},
      options: { showError: () => false },
    } as any;

    component.ngOnInit();

    expect(component.src()).toBe('/sites/default/files/cover.jpg');
    expect(component.formControl.value).toBe('d9b1c290-8a7e-4f9e-9d3e-1a2b3c4d5e6f');
    expect(component.field.props?.alt).toBe('封面');
  });

  it('previews an authorized private image without changing its stored UUID', () => {
    const manage = TestBed.inject(ManageService) as any;
    manage.getMediaImage.mockReturnValue(throwError(() => new Error('private')));
    manage.getMediaFile.mockReturnValue(of(new Blob(['png'], { type: 'image/png' })));
    const revoke = vi.fn();
    const OriginalURL = URL;
    vi.stubGlobal('URL', class extends OriginalURL {
      static createObjectURL = vi.fn(() => 'blob:private-image');
      static revokeObjectURL = revoke;
    });
    const uuid = 'd9b1c290-8a7e-4f9e-9d3e-1a2b3c4d5e6f';
    component.field.props = { valueIsUUID: true };
    component.formControl.setValue(uuid);
    component.ngOnInit();
    expect(component.src()).toBe('blob:private-image');
    expect(component.formControl.value).toBe(uuid);
    fixture.destroy();
    expect(revoke).toHaveBeenCalledWith('blob:private-image');
    vi.unstubAllGlobals();
  });

  it('keeps a historical UUID when both public and protected preview lookups fail', () => {
    const manage = TestBed.inject(ManageService) as any;
    manage.getMediaImage.mockReturnValue(throwError(() => new Error('unavailable')));
    manage.getMediaFile.mockReturnValue(throwError(() => new Error('denied')));
    const uuid = 'd9b1c290-8a7e-4f9e-9d3e-1a2b3c4d5e6f';
    component.field.props = { valueIsUUID: true };
    component.formControl.setValue(uuid);
    component.ngOnInit();
    expect(component.formControl.value).toBe(uuid);
    expect(component.src()).toBe('');
  });

  it('uses the plain form value directly when it is not a UUID', () => {
    component.field = {
      key: 'src',
      props: {},
      formControl: new UntypedFormControl('/assets/img.png'),
      formState: {},
      options: { showError: () => false },
    } as any;

    component.ngOnInit();

    expect(component.src()).toBe('/assets/img.png');
  });

  it('remove clears the value only after confirmation', () => {
    const dialog = TestBed.inject(MatDialog) as any;
    component.field = {
      key: 'src',
      props: {},
      formControl: new UntypedFormControl('/assets/img.png'),
      formState: {},
      options: { showError: () => false },
    } as any;

    dialog.open.mockReturnValue({ afterClosed: vi.fn(() => of(false)) });
    component.remove();
    expect(component.formControl.value).toBe('/assets/img.png');

    dialog.open.mockReturnValue({ afterClosed: vi.fn(() => of(true)) });
    component.remove();
    expect(component.formControl.value).toBe('');
  });
});
