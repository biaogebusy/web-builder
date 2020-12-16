import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrandingModule } from './branding/branding.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { JobModule } from './job/job.module';

@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrandingModule,
    JobModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
