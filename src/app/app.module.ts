import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MobxAngularModule } from 'mobx-angular';
import { MobxModule } from './mobx/mobx.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrandingModule } from './branding/branding.module';
import { AppComponent } from './app.component';
import { JobModule } from './job/job.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { PageRenderModule } from './page-render/page-render.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
    cookieName: 'pai-Xsrf-Cookie',
    headerName: 'pai-Xsrf-Header',
  }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    LayoutModule,
    MobxAngularModule,
    MobxModule.forRoot(),
    BrandingModule,
    JobModule,
    ArticleModule,
    UserModule,
    PageRenderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
