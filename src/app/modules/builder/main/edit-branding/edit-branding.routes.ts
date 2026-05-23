import { Routes } from '@angular/router';
import { unsavedChangesGuard } from '@core/guards/unsaved-changes.guard';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { EditFooterComponent } from './edit-footer/edit-footer.component';

export const routes: Routes = [
  {
    path: 'header',
    component: EditHeaderComponent,
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: 'footer',
    component: EditFooterComponent,
    canDeactivate: [unsavedChangesGuard],
  },
  { path: '', redirectTo: 'header', pathMatch: 'full' },
];
