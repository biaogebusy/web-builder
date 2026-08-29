import { EnvironmentInjector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
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

  it('resolves a backfilled media UUID into a preview URL and file meta', () => {
    const manageService = TestBed.inject(ManageService) as any;
    manageService.getUrlIncluded.mockReturnValue('/sites/default/files/cover.jpg');
    manageService.getMediaImage.mockReturnValue(
      of({
        data: {
          attributes: { name: 'cover.jpg' },
          relationships: { field_media_image: { data: { id: 'f1', meta: { alt: '封面' } } } },
        },
        included: [{ id: 'f1', attributes: { uri: { url: '/sites/default/files/cover.jpg' } } }],
      })
    );
    component.field = {
      key: 'field_image',
      props: { valueIsUUID: true },
      formControl: new UntypedFormControl('d9b1c290-8a7e-4f9e-9d3e-1a2b3c4d5e6f'),
      formState: {},
      options: { showError: () => false },
    } as any;

    component.ngOnInit();

    expect(component.src()).toBe('/sites/default/files/cover.jpg');
    expect(component.field.props.fileName).toBe('cover.jpg');
    expect(component.field.props.alt).toBe('封面');
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
});
