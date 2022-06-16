import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { Profile1v1Component } from './profile1v1/profile1v1.component';
import { UserCenterComponent } from './user-center/user-center.component';
import { DynamicCombsModule } from '@uiux/combs/dynamic-combs/dynamic-combs.module';

const components = [Profile1v1Component, UserCenterComponent];

@NgModule({
  declarations: [components],
  imports: [ShareModule, WidgetsModule, DynamicCombsModule],
  exports: [components],
})
export class ProfileModule {}
