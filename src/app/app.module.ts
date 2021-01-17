import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MobxAngularModule } from 'mobx-angular';
import { MobxModule } from './mobx/mobx.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrandingModule } from './branding/branding.module';
import { AppComponent } from './app.component';
import { JobModule } from './job/job.module';
import { UserModule } from './user/user.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    LayoutModule,
    MobxAngularModule,
    MobxModule.forRoot(),
    BrandingModule,
    JobModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
