import { EnvironmentInjector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { provideUiuxMocks } from '@uiux/testing/mocks';

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
});
