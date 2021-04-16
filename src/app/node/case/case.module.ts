import { NgModule } from '@angular/core';
import { UiuxModule } from '../../uiux/uiux.module';
import { ShareModule } from '../../share/share.module';
import { CaseComponent } from './case.component';
import { CaseNodeComponent } from './case-node/case-node.component';

@NgModule({
  declarations: [CaseComponent, CaseNodeComponent],
  imports: [UiuxModule, ShareModule],
  exports: [CaseComponent, CaseNodeComponent],
})
export class CaseModule {}
