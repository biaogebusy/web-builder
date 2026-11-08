import { Directive, inject, OnDestroy, TemplateRef } from '@angular/core';
import { DialogComponent } from './dialog.component';

/** Place one content-owned template in the enclosing dialog's actions area. */
@Directive({ selector: 'ng-template[appDialogActions]' })
export class DialogActionsDirective implements OnDestroy {
  private readonly dialog = inject(DialogComponent);
  private readonly template = inject<TemplateRef<unknown>>(TemplateRef);

  constructor() {
    this.dialog.customActions.set(this.template);
  }

  ngOnDestroy(): void {
    if (this.dialog.customActions() === this.template) {
      this.dialog.customActions.set(null);
    }
  }
}
