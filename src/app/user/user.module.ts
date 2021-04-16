import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [ShareModule],
})
export class UserModule {}
