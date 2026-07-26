import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BuilderService } from '@core/service/builder.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import {
  createBuilderServiceMock,
  createBuilderStateMock,
  createUtilitiesServiceMock,
} from '@core/testing/mocks';
import { provideUiuxMocks } from '@uiux/testing/mocks';
import { of, throwError } from 'rxjs';

import { JsoneditorComponent } from './jsoneditor.component';

describe('JsoneditorComponent', () => {
  let component: JsoneditorComponent;
  let fixture: ComponentFixture<JsoneditorComponent>;
  const builderState = createBuilderStateMock();
  const builderService = createBuilderServiceMock();
  const util = createUtilitiesServiceMock();

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [JsoneditorComponent],
      providers: [
        provideRouter([]),
        ...provideUiuxMocks(),
        { provide: BuilderState, useValue: builderState },
        { provide: BuilderService, useValue: builderService },
        { provide: UtilitiesService, useValue: util },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JsoneditorComponent);
    fixture.componentRef.setInput('content', {});
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('replaces the whole page when editing page json', () => {
    fixture.componentRef.setInput('content', { isPage: true });
    component.value = { title: '新页面', body: [] };

    component.updateContent();

    expect(builderState.setCurrentPage).toHaveBeenCalledWith({ title: '新页面', body: [] });
    expect(component.loading()).toBe(false);
  });

  it('writes component json back to its path', () => {
    fixture.componentRef.setInput('content', { path: 'body.2' });
    component.value = { type: 'text', body: '<p>hi</p>' };

    component.updateContent();

    expect(builderState.updatePageContentByPath).toHaveBeenCalledWith('body.2', {
      type: 'text',
      body: '<p>hi</p>',
    });
  });

  it('does nothing without an edited value', () => {
    component.updateContent();

    expect(builderState.setCurrentPage).not.toHaveBeenCalled();
    expect(builderState.updatePageContentByPath).not.toHaveBeenCalled();
  });

  it('ignores DOM events and marks real edits as loading', () => {
    component.onChange({ timeStamp: 12345 });
    expect(component.loading()).toBe(false);

    component.onChange({ type: 'text' });
    expect(component.loading()).toBe(true);
  });

  it('persists the setting body and closes the drawer on success', () => {
    const drawerClosed = vi.fn();
    builderState.closeRightDrawer$.subscribe(drawerClosed);
    fixture.componentRef.setInput('content', { isSetting: true });
    component.value = { spacing: 'lg' };
    builderService.updateAttributes.mockReturnValueOnce(of({ data: {} }));

    component.onUpdateAttr({
      params: { uuid: 'block-1', langcode: 'en', api: '/api/v1/block' },
    });

    expect(builderService.updateAttributes).toHaveBeenCalledWith(
      { uuid: 'block-1', langcode: 'en' },
      '/api/v1/block',
      { body: JSON.stringify({ spacing: 'lg' }) },
      {}
    );
    expect(util.openSnackbar).toHaveBeenCalledWith('更新成功！', 'ok');
    expect(drawerClosed).toHaveBeenCalledWith(true);
    expect(component.loading()).toBe(false);
  });

  it('stays quiet when persisting the attributes fails', () => {
    fixture.componentRef.setInput('content', { isSetting: true });
    component.value = { spacing: 'lg' };
    builderService.updateAttributes.mockReturnValueOnce(throwError(() => new Error('500')));

    component.onUpdateAttr({
      params: { uuid: 'block-1', langcode: 'en', api: '/api/v1/block' },
    });

    expect(util.openSnackbar).not.toHaveBeenCalled();
    expect(component.loading()).toBe(false);
  });
});
