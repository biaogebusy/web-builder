import { TestBed } from '@angular/core/testing';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  const dialogRef = { close: vi.fn() };

  const create = (data: unknown): DialogComponent => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: dialogRef },
      ],
    });
    return TestBed.runInInjectionContext(() => new DialogComponent());
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('closes with true on confirm when no form is attached', () => {
    const component = create({ inputData: { content: { type: 'text', body: 'hi' } } });

    component.onYesClick();

    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('blocks confirm and surfaces errors when the attached form is invalid', () => {
    const form = new UntypedFormGroup({
      title: new FormControl('', Validators.required),
    });
    const component = create({ inputData: { content: { form } } });

    component.onYesClick();

    expect(dialogRef.close).not.toHaveBeenCalled();
    expect(form.get('title')?.touched).toBe(true);
  });

  it('closes with true on confirm when the attached form is valid', () => {
    const form = new UntypedFormGroup({
      title: new FormControl('Hello', Validators.required),
    });
    const component = create({ inputData: { content: { form } } });

    component.onYesClick();

    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('closes with false on cancel even when the form is invalid', () => {
    const form = new UntypedFormGroup({
      title: new FormControl('', Validators.required),
    });
    const component = create({ inputData: { content: { form } } });

    component.onNoClick();

    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });
});
