import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { Action1v1Component } from './action1v1/action1v1.component';

const components = [Action1v1Component];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule],
  exports: [...components],
})
export class ActionModule {}
