import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [ShareModule, UserRoutingModule],
})
export class UserModule {}
