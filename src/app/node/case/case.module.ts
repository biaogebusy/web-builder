import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiuxModule } from '../../uiux/uiux.module';
import { CaseComponent } from './case.component';
import { CaseNodeComponent } from './case-node/case-node.component';

@NgModule({
  declarations: [CaseComponent, CaseNodeComponent],
  imports: [CommonModule, UiuxModule],
  exports: [CaseComponent, CaseNodeComponent],
})
export class CaseModule {}
