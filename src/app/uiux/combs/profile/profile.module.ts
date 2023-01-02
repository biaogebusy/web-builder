import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { Profile1v1Component } from './profile1v1/profile1v1.component';
import { UserCenterComponent } from './user-center/user-center.component';
import { ListModule } from '../list/list.module';
import { UserFavoriteComponent } from './user-center/user-favorite/user-favorite.component';
import { UserPayComponent } from './user-center/user-pay/user-pay.component';
import { UserProfileComponent } from './user-center/user-profile/user-profile.component';
import { BaseModule } from '@uiux/base/base.module';

const components = [
  Profile1v1Component,
  UserCenterComponent,
  UserFavoriteComponent,
  UserPayComponent,
];

@NgModule({
  declarations: [...components, UserProfileComponent],
  imports: [ShareModule, WidgetsModule, ListModule],
  exports: [...components],
})
export class ProfileModule extends BaseModule {
  dynamicComponents = [...components];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }

  static forStorybook(): any {
    return [...components];
  }
}
