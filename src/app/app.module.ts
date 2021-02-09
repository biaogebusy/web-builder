import { BrowserModule, Title } from '@angular/platform-browser';
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
import { UserModule } from './user/user.module';
import { NodeModule } from './node/node.module';
import { PageRenderModule } from './page-render/page-render.module';
import { AppState } from './mobx/AppState';
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
    NodeModule,
    UserModule,
    PageRenderModule,
  ],
  providers: [Title, AppState],
  bootstrap: [AppComponent],
})
export class AppModule {}
