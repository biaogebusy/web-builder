import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ShowcaseModule } from '../showcase/showcase.module';
import { ListComponent } from './list/list.component';
import { TaxonomyListComponent } from './taxonomy-list/taxonomy-list.component';
import { DynamicMediaListComponent } from './dynamic-media-list/dynamic-media-list.component';
import { DynamicCardListComponent } from './dynamic-card-list/dynamic-card-list.component';
import { DynamicTextListComponent } from './dynamic-text-list/dynamic-text-list.component';
import { TaxonomyThinListComponent } from './taxonomy-thin-list/taxonomy-thin-list.component';
import { ListThinComponent } from './list/list-thin/list-thin.component';
import { SearchModule } from '../search/search.module';
import { TreeListComponent } from './tree-list/tree-list.component';
import { DynamicCardList1v1Component } from './dynamic-card-list1v1/dynamic-card-list1v1.component';
import { BaseModule } from '@uiux/base/base.module';

const components = [
  ListComponent,
  TaxonomyListComponent,
  DynamicMediaListComponent,
  DynamicCardListComponent,
  DynamicCardList1v1Component,
  DynamicTextListComponent,
  TaxonomyThinListComponent,
  ListThinComponent,
  TreeListComponent,
];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, ShowcaseModule, SearchModule],
  exports: [...components],
})
export class ListModule extends BaseModule {
  dynamicComponents = [...components];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
}
