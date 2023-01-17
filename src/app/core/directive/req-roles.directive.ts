import {
  Directive,
  Input,
  Inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserService } from '@core/service/user.service';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';

@Directive({
  selector: '[reqRolesIf]',
})
export class ReqRolesDirective {
  private hasView = false;

  constructor(
    private userService: UserService,
    @Inject(USER) private user: IUser,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set reqRolesIf(content: any) {
    if (content && this.userService.checkShow(content, this.user)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (content && !this.userService.checkShow(content, this.user)) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
