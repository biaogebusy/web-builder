import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { UserComponent } from './user.component';
import { BaseModule } from '@uiux/base/base.module';
import { UserSettingComponent } from './user-setting/user-setting.component';
const components = [LoginComponent, LoginCallbackComponent, UserComponent, UserSettingComponent];
@NgModule({
  declarations: [],
  imports: [UserRoutingModule, ...components],
  exports: [LoginComponent],
})
export class UserModule extends BaseModule {
  dynamicComponents = [...components];
}
