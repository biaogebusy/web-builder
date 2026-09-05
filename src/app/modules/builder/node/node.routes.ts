import { Routes } from '@angular/router';
import { superAdminGuard } from '@core/guards/super-admin.guard';
import { unsavedChangesGuard } from '@core/guards/unsaved-changes.guard';

/**
 * Node content routes with a uniform naming convention:
 * - add/:type          create
 * - edit/:type/:uuid   edit
 * - manage             content manage list
 * - uiux               component manage (component nodes, admin only)
 * Fixed entries are aggregated in the management center /builder/hub
 */
export const routes: Routes = [
  {
    path: 'add/:type',
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () => import('./node-add/node-add.component').then(m => m.NodeAddComponent),
  },
  {
    path: 'edit/:type/:uuid',
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () => import('./node-add/node-add.component').then(m => m.NodeAddComponent),
  },
  {
    path: 'manage',
    loadComponent: () =>
      import('./node-manage/node-manage.component').then(m => m.NodeManageComponent),
    data: { titleKey: 'BUILDER.NODE_MANAGE.PAGE_TITLE' },
  },
  {
    path: 'uiux',
    canActivate: [superAdminGuard],
    loadComponent: () =>
      import('./node-uiux/node-uiux.component').then(m => m.NodeUiuxComponent),
    data: { titleKey: 'BUILDER.NODE_UIUX.PAGE_TITLE' },
  },
];
