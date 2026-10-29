import { Pipe, PipeTransform, inject } from '@angular/core';
import type { IMainMenu } from '@core/interface/branding/IBranding';
import type { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';

interface MenuGroup {
  label: string;
  items: IMainMenu[];
}

/** Keeps visible menu sections in their configured order. */
@Pipe({ name: 'menuGroups' })
export class MenuGroupsPipe implements PipeTransform {
  private readonly userService = inject(UserService);

  /** Filters before grouping so hidden entries cannot leave empty section headings. */
  transform(items: readonly IMainMenu[] | undefined, user: IUser | boolean): MenuGroup[] {
    const groups: MenuGroup[] = [];
    const currentUser = typeof user === 'boolean' ? undefined : user;
    for (const item of items ?? []) {
      if (!this.userService.checkShow(item, currentUser)) continue;
      const label = item.group?.trim() || '';
      const previous = groups.at(-1);
      if (previous?.label === label) previous.items.push(item);
      else groups.push({ label, items: [item] });
    }
    return groups;
  }
}
