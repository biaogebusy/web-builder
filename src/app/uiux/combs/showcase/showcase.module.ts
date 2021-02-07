import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Showcase2v1Component } from './showcase2v1/showcase2v1.component';
import { WidgetsModule } from '../../widgets/widgets.module';

const components = [Showcase2v1Component];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, WidgetsModule],
  exports: [...components],
})
export class ShowcaseModule {}
