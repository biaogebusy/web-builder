import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiuxModule } from '../../uiux/uiux.module';
import { NodeModule } from '../node/node.module';
import { BlockComponent } from './block/block.component';
import { PageRoutingModule } from './page-routing.module';

const modules = [CommonModule, UiuxModule, NodeModule, PageRoutingModule];
@NgModule({
  declarations: [BlockComponent],
  imports: [...modules],
})
export class PageRenderModule {}
