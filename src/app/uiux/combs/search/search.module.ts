import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { SearchComponent } from './search.component';
import { HeroModule } from '../hero/hero.module';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchTopComponent } from './search-top/search-top.component';
import { SearchStatusComponent } from './search-status/search-status.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchHeaderComponent,
    SearchListComponent,
    SearchTopComponent,
    SearchStatusComponent,
  ],
  imports: [ShareModule, WidgetsModule, HeroModule],
  exports: [SearchComponent, SearchListComponent],
})
export class SearchModule {}
