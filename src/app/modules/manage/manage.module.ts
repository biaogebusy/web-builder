import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { ManageRoutingModule } from './manage-routing.module';
import { ManageMediaComponent } from './manage-media/manage-media.component';
import { UiuxModule } from '@uiux/uiux.module';
const components = [ManageMediaComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, UiuxModule, ManageRoutingModule],
})
export class ManageModule {}
