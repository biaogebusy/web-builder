import { NgModule } from '@angular/core';
import { ShareModule } from 'src/app/share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ShowcaseModule } from '../showcase/showcase.module';
import { ListComponent } from './list/list.component';
import { TaxonomyListComponent } from './taxonomy-list/taxonomy-list.component';
import { DynamicMediaListComponent } from './dynamic-media-list/dynamic-media-list.component';
import { DynamicCardListComponent } from './dynamic-card-list/dynamic-card-list.component';
import { DynamicTextListComponent } from './dynamic-text-list/dynamic-text-list.component';

const components = [
  ListComponent,
  TaxonomyListComponent,
  DynamicMediaListComponent,
  DynamicCardListComponent,
  DynamicTextListComponent,
];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, ShowcaseModule],
  exports: [...components],
})
export class ListModule {}
