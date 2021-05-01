import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ShareModule } from '../share/share.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [ShareModule, UserRoutingModule],
})
export class UserModule {}
