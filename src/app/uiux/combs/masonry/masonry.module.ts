import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ShuffleComponent } from './shuffle/shuffle.component';

const components = [ShuffleComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule],
  exports: [...components],
})
export class MasonryModule {}
