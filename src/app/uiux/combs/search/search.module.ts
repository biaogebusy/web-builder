import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { SearchComponent } from './search.component';
import { HeroModule } from '../hero/hero.module';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchTopComponent } from './search-top/search-top.component';
import { SearchStatusComponent } from './search-status/search-status.component';
import { SearchFilterDialogComponent } from './search-filter-dialog/search-filter-dialog.component';
import { SearchFilterItemComponent } from './search-filter-dialog/search-filter-item/search-filter-item.component';
import { BaseModule } from '@uiux/base/base.module';

@NgModule({
  declarations: [
    SearchComponent,
    SearchHeaderComponent,
    SearchListComponent,
    SearchTopComponent,
    SearchStatusComponent,
    SearchFilterDialogComponent,
    SearchFilterItemComponent,
  ],
  imports: [ShareModule, WidgetsModule, HeroModule],
  exports: [SearchComponent, SearchListComponent, SearchHeaderComponent],
})
export class SearchModule extends BaseModule {
  dynamicComponents = [
    SearchComponent,
    SearchListComponent,
    SearchHeaderComponent,
  ];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
}
