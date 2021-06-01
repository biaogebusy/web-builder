import { NgModule } from '@angular/core';
import { Showcase2v1Component } from './showcase2v1/showcase2v1.component';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ShareModule } from '../../../share/share.module';
import { Showcase1v1Component } from './showcase1v1/showcase1v1.component';
import { Showcase3v1Component } from './showcase3v1/showcase3v1.component';
import { Showcase3v2Component } from './showcase3v2/showcase3v2.component';
import { Showcase3v3Component } from './showcase3v3/showcase3v3.component';
import { Showcase3v4Component } from './showcase3v4/showcase3v4.component';
import { Showcase4v1Component } from './showcase4v1/showcase4v1.component';
import { Showcase1v3Component } from './showcase1v3/showcase1v3.component';
import { Showcase3v5Component } from './showcase3v5/showcase3v5.component';
import { Showcase3v6Component } from './showcase3v6/showcase3v6.component';

const components = [
  Showcase1v1Component,
  Showcase1v3Component,
  Showcase2v1Component,
  Showcase3v1Component,
  Showcase3v2Component,
  Showcase3v3Component,
  Showcase3v4Component,
  Showcase3v5Component,
  Showcase3v6Component,
  Showcase4v1Component,
];

@NgModule({
  declarations: [...components],
  imports: [WidgetsModule, ShareModule],
  exports: [...components],
})
export class ShowcaseModule {}
