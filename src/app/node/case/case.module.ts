import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseComponent } from './case.component';
import { UiuxModule } from '../../uiux/uiux.module';

@NgModule({
  declarations: [CaseComponent],
  imports: [CommonModule, UiuxModule],
})
export class CaseModule {}
