import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { SearchComponent } from './search.component';
import { HeroModule } from '../hero/hero.module';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { SearchListComponent } from './search-list/search-list.component';
import { BaseModule } from '@uiux/base/base.module';

const components = [
  SearchComponent,
  SearchListComponent,
  SearchHeaderComponent,
];
@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, HeroModule],
  exports: [SearchComponent, SearchListComponent, SearchHeaderComponent],
})
export class SearchModule extends BaseModule {
  dynamicComponents = [...components];

  static forStorybook(): any {
    return [...components];
  }
}
