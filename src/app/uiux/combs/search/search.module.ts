import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { SearchComponent } from './search.component';
import { HeroModule } from '../hero/hero.module';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { SearchListComponent } from './search-list/search-list.component';
import { BaseModule } from '@uiux/base/base.module';
import { SearchSidebarComponent } from './search-sidebar/search-sidebar.component';
import { FormModule } from '../form/form.module';
import { MatChipsModule } from '@angular/material/chips';

const components = [
  SearchComponent,
  SearchListComponent,
  SearchHeaderComponent,
  SearchSidebarComponent,
];
@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, HeroModule, FormModule, MatChipsModule],
  exports: [...components],
})
export class SearchModule extends BaseModule {
  dynamicComponents = [...components];

  static forStorybook(): any {
    return [...components];
  }
}
