import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { ProfileModule } from '@uiux/combs/profile/profile.module';
import { ListModule } from '@uiux/combs/list/list.module';
import { CountdownModule } from 'ngx-countdown';
import { UserComponent } from './user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserFavoriteComponent } from './user-favorite/user-favorite.component';
import { UserPayComponent } from './user-pay/user-pay.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    UserHomeComponent,
    UserFavoriteComponent,
    UserPayComponent,
  ],
  imports: [
    ShareModule,
    WidgetsModule,
    CountdownModule,
    ProfileModule,
    ListModule,
    UserRoutingModule,
  ],
})
export class UserModule {}
