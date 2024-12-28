import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { ListModule } from '@uiux/combs/list/list.module';
import { UserComponent } from './user.component';
import { BaseModule } from '@uiux/base/base.module';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { FormModule } from '@uiux/combs/form/form.module';
const components = [LoginComponent, UserComponent, UserSettingComponent];
@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, ListModule, UserRoutingModule, FormModule],
  exports: [LoginComponent],
})
export class UserModule extends BaseModule {
  dynamicComponents = [...components];
}
