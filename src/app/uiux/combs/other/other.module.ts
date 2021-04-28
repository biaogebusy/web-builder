import { NgModule } from '@angular/core';
import { ShareModule } from 'src/app/share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';

import { WhychooseusComponent } from './whychooseus/whychooseus.component';

const components = [WhychooseusComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule],
  exports: [...components],
})
export class OtherModule {}
