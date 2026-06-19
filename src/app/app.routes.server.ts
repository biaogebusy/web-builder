import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'preview',
    renderMode: RenderMode.Client,
  },
  {
    path: 'builder',
    renderMode: RenderMode.Client,
  },
  {
    path: 'builder/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'en/builder',
    renderMode: RenderMode.Client,
  },
  {
    path: 'en/builder/**',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
