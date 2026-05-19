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
import { EditHeaderComponent } from './edit-header.component';

const routes: Routes = [
  {
    path: '',
    component: EditHeaderComponent,
    canDeactivate: [unsavedChangesGuard],
  },
];

@NgModule({
  declarations: [EditHeaderComponent],
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
export class EditHeaderModule {}
