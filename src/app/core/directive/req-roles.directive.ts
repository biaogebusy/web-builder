import {
  Directive,
  Input,
  Inject,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { UserService } from '@core/service/user.service';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { Observable } from 'rxjs';

@Directive({
  selector: '[reqRolesIf]',
})
export class ReqRolesDirective {
  userService = inject(UserService);
  viewContainer = inject(ViewContainerRef);
  templateRef = inject(TemplateRef<any>);

  user: IUser;
  constructor(@Inject(USER) private currentUser$: Observable<IUser>) {
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
