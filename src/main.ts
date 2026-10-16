import { bootstrapApplication } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { installChunkReloadHandler, watchRouterChunkFailures } from './reload-on-chunk-failure';

// Resource retention is the primary protection; install recovery before bootstrap as a fallback.
installChunkReloadHandler();

bootstrapApplication(AppComponent, appConfig)
  .then(appRef => watchRouterChunkFailures(appRef.injector.get(Router)))
  .catch(err => console.error(err));
