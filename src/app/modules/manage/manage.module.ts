import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { ManageRoutingModule } from './manage-routing.module';
import { ManageMediaComponent } from './manage-media/manage-media.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { ManageBlockComponent } from './manage-block/manage-block.component';
import { MatSidenavModule } from '@angular/material/sidenav';
const components = [ManageMediaComponent, ManageBlockComponent];

@NgModule({
  declarations: [...components],
  imports: [MatSidenavModule, ShareModule, WidgetsModule, ManageRoutingModule],
})
export class ManageModule {}
