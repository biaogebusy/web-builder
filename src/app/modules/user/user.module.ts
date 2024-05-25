import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { ListModule } from '@uiux/combs/list/list.module';
import { UserComponent } from './user.component';
import { BaseModule } from '@uiux/base/base.module';
const components = [LoginComponent, UserComponent];
@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, ListModule, UserRoutingModule],
  exports: [LoginComponent],
})
export class UserModule extends BaseModule {
  dynamicComponents = [...components];
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
}
