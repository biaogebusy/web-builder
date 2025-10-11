import { DestroyRef, Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { UserService } from '@core/service/user.service';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[reqRolesIf]',
  standalone: false,
})
export class ReqRolesDirective {
  private currentUser$ = inject<Observable<IUser>>(USER);

  private userService = inject(UserService);
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);
  private destroyedRef = inject(DestroyRef);
  private user: IUser;

  constructor() {
    this.currentUser$.pipe(takeUntilDestroyed(this.destroyedRef)).subscribe(user => {
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
