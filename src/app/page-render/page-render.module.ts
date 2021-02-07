import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { UiuxModule } from '../uiux/uiux.module';
import { DynamicComponent } from './dynamic/dynamic.component';
import { PageRoutingModule } from './page-routing.module';
@NgModule({
  declarations: [DynamicComponent],
  imports: [CommonModule, ShareModule, UiuxModule, PageRoutingModule],
})
export class PageRenderModule {}
