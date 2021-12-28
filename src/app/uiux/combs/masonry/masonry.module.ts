import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { NgxPackeryModule } from 'ngx-packery';
import { ShuffleComponent } from './shuffle/shuffle.component';
import { PackeryComponent } from './packery/packery.component';

const components = [ShuffleComponent, PackeryComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, NgxPackeryModule],

  exports: [...components],
})
export class MasonryModule {}
