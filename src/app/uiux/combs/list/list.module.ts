import { NgModule } from '@angular/core';
import { ShareModule } from 'src/app/share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ShowcaseModule } from '../showcase/showcase.module';
import { ListComponent } from './list/list.component';
import { TaxonomyListComponent } from './taxonomy-list/taxonomy-list.component';
import { DynamicMediaListComponent } from './dynamic-media-list/dynamic-media-list.component';

const components = [
  ListComponent,
  TaxonomyListComponent,
  DynamicMediaListComponent,
];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, ShowcaseModule],
  exports: [...components],
})
export class ListModule {}
