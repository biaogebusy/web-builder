import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { ListModule } from '@uiux/combs/list/list.module';
import { CountdownModule } from 'ngx-countdown';
import { UserComponent } from './user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { DynamicCombsModule } from '@uiux/combs/dynamic-combs/dynamic-combs.module';

@NgModule({
  declarations: [LoginComponent, UserComponent, UserHomeComponent],
  imports: [
    ShareModule,
    WidgetsModule,
    DynamicCombsModule,
    CountdownModule,
    ListModule,
    UserRoutingModule,
  ],
})
export class UserModule {}
