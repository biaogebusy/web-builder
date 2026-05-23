import { Routes } from '@angular/router';
import { NodeAddComponent } from './node-add.component';

export const routes: Routes = [{ path: ':type', component: NodeAddComponent }];
