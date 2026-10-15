import { bootstrapApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { installChunkReloadHandler, watchRouterChunkFailures } from './reload-on-chunk-failure';

// Deploys replace hashed chunk files; open tabs then fail lazy imports.
// Install before bootstrap so early failures are also caught.
installChunkReloadHandler();

bootstrapApplication(AppComponent, appConfig)
  .then(appRef => watchRouterChunkFailures(appRef.injector.get(Router)))
  .catch(err => console.error(err));
