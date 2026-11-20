import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';
import { UserService } from '@core/service/user.service';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';

@Directive({
  selector: '[reqRolesIf]',
})
export class ReqRolesDirective {
  readonly reqRolesIf = input<any>();

  private currentUser = inject(USER);
  private userService = inject(UserService);
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);
  private viewUser: IUser | undefined;

  constructor() {
    effect(() => {
      const user = this.currentUser();
      const content = this.reqRolesIf();
      if (!content) {
        this.viewContainer.clear();
        return;
      }
      const resolvedUser = user && typeof user === 'object' ? user : undefined;
      if (this.userService.checkShow(content, resolvedUser)) {
        // Content updates retain focus, but a changed user must get a fresh view.
        if (!this.viewContainer.length || this.viewUser !== resolvedUser) {
          this.viewContainer.clear();
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.viewUser = resolvedUser;
        }
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
