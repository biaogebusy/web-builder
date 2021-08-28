import { NgModule } from '@angular/core';
import { ShareModule } from 'src/app/share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ShowcaseModule } from '../showcase/showcase.module';
import { ListComponent } from './list/list.component';
import { TaxonomyListComponent } from './taxonomy-list/taxonomy-list.component';
import { DynamicMediaListComponent } from './dynamic-media-list/dynamic-media-list.component';
import { DynamicCardListComponent } from './dynamic-card-list/dynamic-card-list.component';
import { DynamicTextListComponent } from './dynamic-text-list/dynamic-text-list.component';
import { TaxonomyThinListComponent } from './taxonomy-thin-list/taxonomy-thin-list.component';
import { ListThinComponent } from './list/list-thin/list-thin.component';

const components = [
  ListComponent,
  TaxonomyListComponent,
  DynamicMediaListComponent,
  DynamicCardListComponent,
  DynamicTextListComponent,
  TaxonomyThinListComponent,
  ListThinComponent,
];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, ShowcaseModule],
  exports: [...components],
})
export class ListModule {}
