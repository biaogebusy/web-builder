import { TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { NgPipesModule } from 'ngx-pipes';

import { DialogComponent } from './dialog.component';
import { DialogActionsDirective } from './dialog-actions.directive';

@Component({
  selector: 'app-dynamic-component',
  imports: [DialogActionsDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>Dialog body</p>@if (show()) {
    <ng-template appDialogActions>
      <button [disabled]="busy()" (click)="busy.set(true)">{{ label() }}</button>
    </ng-template>
  }`,
})
class DialogContentStub {
  readonly inputs = input<unknown>();
  readonly show = signal(true);
  readonly busy = signal(false);
  readonly label = signal('Save');
}

@Component({ selector: 'app-btn', template: '' })
class CloseButtonStub {
  readonly content = input<unknown>();
}

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

  it.each([false, true])('renders live content actions and cleans up (default hidden: %s)',
    async disableActions => {
      TestBed.configureTestingModule({
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: {
            inputData: [{}], disableActions, noLabel: 'Cancel', yesLabel: 'Confirm',
          } },
          { provide: MatDialogRef, useValue: dialogRef },
        ],
      }).overrideComponent(DialogComponent, { set: { imports: [
        NgTemplateOutlet, MatDialogModule, MatButtonModule, MatTooltipModule,
        NgPipesModule, DialogContentStub, CloseButtonStub,
      ] } });
      const fixture = TestBed.createComponent(DialogComponent);
      await fixture.whenStable();
      const content = fixture.debugElement.query(By.directive(DialogContentStub))
        .componentInstance as DialogContentStub;
      const element = fixture.nativeElement as HTMLElement;
      const button = element.querySelector<HTMLButtonElement>('.dialog-actions button')!;
      expect(button.textContent).toBe('Save');
      expect(element.querySelector('mat-dialog-content button')).toBeNull();
      button.click();
      await fixture.whenStable();
      expect(button.disabled).toBe(true);
      expect(dialogRef.close).not.toHaveBeenCalled();
      content.label.set('Saving');
      await fixture.whenStable();
      expect(button.textContent).toBe('Saving');
      content.show.set(false);
      await fixture.whenStable();
      expect(fixture.componentInstance.customActions()).toBeNull();
      expect(element.querySelectorAll('.dialog-actions button').length)
        .toBe(disableActions ? 0 : 2);
    });
});
