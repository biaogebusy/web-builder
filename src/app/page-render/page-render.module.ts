import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { UiuxModule } from '../uiux/uiux.module';
import { DynamicComponent } from './dynamic/dynamic.component';

@NgModule({
  declarations: [DynamicComponent],
  imports: [CommonModule, ShareModule, UiuxModule],
})
export class PageRenderModule {}
