import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { UiuxModule } from '../uiux/uiux.module';
import { NodeModule } from '../node/node.module';
import { DynamicComponent } from './dynamic/dynamic.component';
import { PageRoutingModule } from './page-routing.module';

const modules = [
  CommonModule,
  ShareModule,
  UiuxModule,
  NodeModule,
  PageRoutingModule,
];
@NgModule({
  declarations: [DynamicComponent],
  imports: [...modules],
})
export class PageRenderModule {}
