import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Showcase2v1Component } from './showcase2v1/showcase2v1.component';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ShareModule } from '../../../share/share.module';
import { Showcase1v1Component } from './showcase1v1/showcase1v1.component';

const components = [Showcase2v1Component, Showcase1v1Component];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, WidgetsModule, ShareModule],
  exports: [...components],
})
export class ShowcaseModule { }
