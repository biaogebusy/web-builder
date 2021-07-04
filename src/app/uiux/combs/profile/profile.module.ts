import { NgModule } from '@angular/core';
import { ShareModule } from 'src/app/share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { Profile1v1Component } from './profile1v1/profile1v1.component';

const components = [Profile1v1Component];

@NgModule({
  declarations: [components],
  imports: [ShareModule, WidgetsModule],
  exports: [components],
})
export class ProfileModule {}
