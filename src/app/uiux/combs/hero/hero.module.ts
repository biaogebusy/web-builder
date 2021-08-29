import { NgModule } from '@angular/core';
import { ShareModule } from 'src/app/share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { Hero2v1Component } from './hero2v1/hero2v1.component';
import { Hero1v1Component } from './hero1v1/hero1v1.component';
import { Hero2v2Component } from './hero2v2/hero2v2.component';

const components = [Hero2v1Component, Hero1v1Component, Hero2v2Component];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule],
  exports: [...components],
})
export class HeroModule {}
