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
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { environment } from 'src/environments/environment';
import { httpInterceptorProviders } from './interceptors';
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
    NgxGoogleAnalyticsModule.forRoot(environment.ga),
    NgxWebstorageModule.forRoot(),
    MobxModule.forRoot(),
    BrandingModule,
  ],
  providers: [Title, AppState, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
