import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { provideCoreMocks } from '@core/testing/mocks';
import { BuilderState } from '@core/state/BuilderState';
import { UtilitiesService } from '@core/service/utilities.service';
import { WebformPickerService } from '@modules/builder/main/widget-picker/webform/webform-picker.service';

import { SyncWebformComponent } from './sync-webform.component';

describe('SyncWebformComponent', () => {
  let component: SyncWebformComponent;
  let fixture: ComponentFixture<SyncWebformComponent>;
  let builder: any;
  let util: any;
  let picker: { getFields: ReturnType<typeof vi.fn> };

  const liveContent = {
    type: 'dynamic-form',
    form: { type: 'formly', id: 'contact', fields: [{ key: 'name', type: 'input' }] },
    action: { classes: 'flex justify-center', submit: { type: 'btn', label: 'Send' } },
  };

  beforeEach(async () => {
    picker = { getFields: vi.fn() };
    await TestBed.configureTestingModule({
      imports: [SyncWebformComponent],
      providers: [provideRouter([]), ...provideCoreMocks(), {
        provide: WebformPickerService,
        useValue: picker,
      }],
    }).compileComponents();

    builder = TestBed.inject(BuilderState);
    util = TestBed.inject(UtilitiesService);
    builder.currentPage = { title: '', body: [liveContent] };

    fixture = TestBed.createComponent(SyncWebformComponent);
    component = fixture.componentInstance;
    component.field = {
      key: 'sync',
      props: { path: '0' },
      formControl: {} as any,
      formState: {},
      options: { showError: () => false },
    } as any;
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('does not fetch when the page node has no webform id', () => {
    builder.currentPage = { title: '', body: [{ ...liveContent, form: { fields: [] } }] };

    component.onSync();

    expect(picker.getFields).not.toHaveBeenCalled();
    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.FACTORY.SYNC_WEBFORM_NO_ID', 'ok');
  });

  it('replaces the baked-in fields and re-opens the drawer from the fresh node', () => {
    picker.getFields.mockReturnValue(
      of({ name: { '#type': 'textfield', '#title': 'Name' } })
    );

    component.onSync();

    expect(picker.getFields).toHaveBeenCalledWith('contact');
    const [path, content] = builder.updatePageContentByPath.mock.calls[0];
    expect(path).toBe('0');
    // the new CMS fields land in form.fields, everything else survives
    expect(content.form.fields).toEqual([{ key: 'name', type: 'input', props: { label: 'Name' } }]);
    expect(content.action).toEqual(liveContent.action);
    expect(builder.showComponentSetting).toHaveBeenCalledWith(
      content,
      expect.anything(),
      '0'
    );
  });

  it('warns about elements dropped by the mapping', () => {
    picker.getFields.mockReturnValue(of({ signature: { '#type': 'webform_signature' } }));

    component.onSync();

    expect(util.openSnackbar).toHaveBeenCalledWith(
      'BUILDER.WIDGET_PICKER.WEBFORM_PARTIAL',
      'ok'
    );
  });

  it('shows a failure snackbar when the CMS request fails', () => {
    picker.getFields.mockReturnValue(throwError(() => new Error('boom')));

    component.onSync();

    expect(builder.updatePageContentByPath).not.toHaveBeenCalled();
    expect(util.openSnackbar).toHaveBeenCalledWith('BUILDER.FACTORY.SYNC_WEBFORM_FAILED', 'ok');
    expect(component.syncing()).toBe(false);
  });
});
