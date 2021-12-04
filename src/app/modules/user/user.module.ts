import { NgModule } from '@angular/core';
import { ShareModule } from '../../share/share.module';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { WidgetsModule } from '../../uiux/widgets/widgets.module';
import { CountdownModule } from 'ngx-countdown';
import { ProfileModule } from '../../uiux/combs/profile/profile.module';
import { UserComponent } from './user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserFavoriteComponent } from './user-favorite/user-favorite.component';
import { ListModule } from '../../uiux/combs/list/list.module';

@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    UserHomeComponent,
    UserFavoriteComponent,
  ],
  imports: [
    ShareModule,
    UserRoutingModule,
    WidgetsModule,
    CountdownModule,
    ProfileModule,
    ListModule,
  ],
})
export class UserModule {}
