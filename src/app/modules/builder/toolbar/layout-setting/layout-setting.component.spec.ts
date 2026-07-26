import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { BuilderState } from '@core/state/BuilderState';
import { createBuilderStateMock } from '@core/testing/mocks';
import { provideBuilderMocks } from '@modules/builder/testing/mocks';
import { of } from 'rxjs';

import { LayoutSettingComponent } from './layout-setting.component';

describe('LayoutSettingComponent', () => {
  let component: LayoutSettingComponent;
  let fixture: ComponentFixture<LayoutSettingComponent>;
  const builderState = createBuilderStateMock();

  // MatDialog 由组件 standalone 注入器内的 MatDialogModule 提供,TestBed 级
  // override 够不到,只能 spy 组件实际拿到的实例
  const confirmWith = (result: boolean) => {
    const dialog = fixture.debugElement.injector.get(MatDialog);
    return vi
      .spyOn(dialog, 'open')
      .mockReturnValue({ afterClosed: () => of(result) } as unknown as MatDialogRef<unknown>);
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [LayoutSettingComponent],
      providers: [
        provideRouter([]),
        ...provideBuilderMocks(),
        { provide: BuilderState, useValue: builderState },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutSettingComponent);
    fixture.componentRef.setInput('content', {
      path: 'body.0',
      content: { type: 'layout-builder', elements: [{ type: 'text' }, { type: 'btn' }] },
    });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('merges the form model over the current content and updates it at the path', () => {
    component.onModelChange({ layout: { gap: '2rem' } });

    expect(builderState.updatePageContentByPath).toHaveBeenCalledWith(
      'body.0',
      expect.objectContaining({
        gap: '2rem',
        type: 'layout-builder',
        elements: [{ type: 'text' }, { type: 'btn' }],
      })
    );
  });

  it('does not update the page when the setting has no path', () => {
    fixture.componentRef.setInput('content', { content: { type: 'layout-builder' } });

    component.onModelChange({ layout: { gap: '2rem' } });

    expect(builderState.updatePageContentByPath).not.toHaveBeenCalled();
  });

  it('removes the element at the index and writes the list back to path.elements', () => {
    const elements = [{ type: 'text' }, { type: 'btn' }];

    component.onDelete(elements, 0);

    expect(builderState.updatePageContentByPath).toHaveBeenCalledWith('body.0.elements', [
      { type: 'btn' },
    ]);
  });

  it('duplicates the element at the index on copy', () => {
    const elements = [{ type: 'text' }, { type: 'btn' }];

    component.onCopy(elements, 1);

    expect(builderState.updatePageContentByPath).toHaveBeenCalledWith('body.0.elements', [
      { type: 'text' },
      { type: 'btn' },
      { type: 'btn' },
    ]);
  });

  it('bulk-applies the animation only after the dialog is confirmed', () => {
    const animate = { aos: { enable: true } };
    confirmWith(true);

    component.applyAosAllTopComponent(animate);

    expect(builderState.bulkUpdateComponent).toHaveBeenCalledWith({ animate });
  });

  it('skips the bulk update when the dialog is cancelled', () => {
    confirmWith(false);

    component.applyAosAllTopComponent({ aos: { enable: true } });

    expect(builderState.bulkUpdateComponent).not.toHaveBeenCalled();
  });
});
