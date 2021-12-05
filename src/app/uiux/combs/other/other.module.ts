import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';

import { WhychooseusComponent } from './whychooseus/whychooseus.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

const components = [
  WhychooseusComponent,
  NotfoundComponent,
  DynamicFormComponent,
];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule],
  exports: [...components],
})
export class OtherModule {}
