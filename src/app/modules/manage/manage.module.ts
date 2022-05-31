import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { ManageRoutingModule } from './manage-routing.module';
import { ManageMediaComponent } from './manage-media/manage-media.component';
import { UiuxModule } from '@uiux/uiux.module';
import { ManageBlockComponent } from './manage-block/manage-block.component';
const components = [ManageMediaComponent, ManageBlockComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, UiuxModule, ManageRoutingModule],
})
export class ManageModule {}
