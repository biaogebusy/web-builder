import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { WidgetsModule } from '../uiux/widgets/widgets.module';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [LoginComponent],
  imports: [ShareModule, UserRoutingModule, WidgetsModule, CountdownModule],
})
export class UserModule {}
