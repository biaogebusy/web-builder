import { Routes } from '@angular/router';
import { superAdminGuard } from '@core/guards/super-admin.guard';

/**
 * 节点内容路由,统一命名规范:
 * - ''                 内容中心(发布、管理等固定入口)
 * - add/:type          新建
 * - edit/:type/:uuid   编辑
 * - manage             内容管理列表
 * - uiux               组件管理(component 节点,仅管理员)
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./node-hub/node-hub.component').then(m => m.NodeHubComponent),
  },
  {
    path: 'add/:type',
    loadComponent: () => import('./node-add/node-add.component').then(m => m.NodeAddComponent),
  },
  {
    path: 'edit/:type/:uuid',
    loadComponent: () => import('./node-add/node-add.component').then(m => m.NodeAddComponent),
  },
  {
    path: 'manage',
    loadComponent: () =>
      import('./node-manage/node-manage.component').then(m => m.NodeManageComponent),
  },
  {
    path: 'uiux',
    canActivate: [superAdminGuard],
    loadComponent: () =>
      import('./node-uiux/node-uiux.component').then(m => m.NodeUiuxComponent),
  },
];
