import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { UserService } from '@core/service/user.service';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { Observable } from 'rxjs';

@Directive({
    selector: '[reqRolesIf]',
    standalone: false
})
export class ReqRolesDirective {
  private currentUser$ = inject<Observable<IUser>>(USER);

  private userService = inject(UserService);
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);

  private user: IUser;

  constructor() {
    this.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  @Input() set reqRolesIf(content: any) {
    if (content && this.userService.checkShow(content, this.user)) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (content && !this.userService.checkShow(content, this.user)) {
      this.viewContainer.clear();
    }
  }
}
