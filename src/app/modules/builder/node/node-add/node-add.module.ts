import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { FormModule } from '@uiux/combs/form/form.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NodeAddComponent } from './node-add.component';

const routes: Routes = [{ path: ':type', component: NodeAddComponent }];

@NgModule({
  declarations: [NodeAddComponent],
  imports: [
    ShareModule,
    WidgetsModule,
    FormModule,
    FormlyModule,
    FormlyMaterialModule,
    RouterModule.forChild(routes),
  ],
})
export class NodeAddModule {}
