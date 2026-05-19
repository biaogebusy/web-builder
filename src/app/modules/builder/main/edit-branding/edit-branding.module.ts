import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { unsavedChangesGuard } from '@core/guards/unsaved-changes.guard';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { EditFooterComponent } from './edit-footer/edit-footer.component';

const routes: Routes = [
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

@NgModule({
  declarations: [EditHeaderComponent, EditFooterComponent],
  imports: [
    ShareModule,
    WidgetsModule,
    DragDropModule,
    FormlyModule,
    FormlyMaterialModule,
    FormlyMatToggleModule,
    MonacoEditorModule,
    RouterModule.forChild(routes),
  ],
})
export class EditBrandingModule {}
