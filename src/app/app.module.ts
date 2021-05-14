import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { MobxAngularModule } from 'mobx-angular';
import { MobxModule } from './mobx/mobx.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrandingModule } from './branding/branding.module';
import { AppComponent } from './app.component';
import { AppState } from './mobx/AppState';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatSidenavModule,
    MobxAngularModule,
    NgxWebstorageModule.forRoot(),
    MobxModule.forRoot(),
    BrandingModule,
  ],
  providers: [Title, AppState],
  bootstrap: [AppComponent],
})
export class AppModule {}
