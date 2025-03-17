import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { ShareModule } from '@share/share.module';
import { BaseModule } from '@uiux/base/base.module';
import { DashboardBoxComponent } from './dashboard-box/dashboard-box.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { FormModule } from '@uiux/combs/form/form.module';

const components = [DashboardComponent, DashboardBoxComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, FormModule],
  exports: [...components],
})
export class DashboardModule extends BaseModule {
  dynamicComponents = [...components];
}
