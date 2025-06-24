import { NgModule } from '@angular/core';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { withRoutes, provideServerRendering } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';

@NgModule({
  imports: [AppModule],
  bootstrap: [AppComponent],
  providers: [provideServerRendering(withRoutes(serverRoutes))],
})
export class AppServerModule {}
