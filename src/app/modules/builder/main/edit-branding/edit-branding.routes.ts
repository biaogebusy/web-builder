import { Routes } from '@angular/router';
import { unsavedChangesGuard } from '@core/guards/unsaved-changes.guard';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { EditFooterComponent } from './edit-footer/edit-footer.component';

export const routes: Routes = [
  {
    path: 'header',
    component: EditHeaderComponent,
    data: { titleKey: 'BUILDER.EDIT_BRANDING.HEADER_TITLE' },
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: 'footer',
    component: EditFooterComponent,
    data: { titleKey: 'BUILDER.EDIT_BRANDING.FOOTER_TITLE' },
    canDeactivate: [unsavedChangesGuard],
  },
  { path: '', redirectTo: 'header', pathMatch: 'full' },
];
