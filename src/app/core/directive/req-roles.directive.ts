import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';
import { UserService } from '@core/service/user.service';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[reqRolesIf]',
})
export class ReqRolesDirective {
  readonly reqRolesIf = input<any>();

  private currentUser = inject(USER);
  private userService = inject(UserService);
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);
  private destroyedRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const user = this.currentUser();
      const content = this.reqRolesIf();
      if (!content) {
        return;
      }
      const resolvedUser = user && typeof user === 'object' ? user : undefined;
      if (this.userService.checkShow(content, resolvedUser)) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
