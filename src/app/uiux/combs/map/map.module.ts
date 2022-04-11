import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { LocationComponent } from './location/location.component';
import { MapListV1Component } from './map-list-v1/map-list-v1.component';

const components = [LocationComponent, MapListV1Component];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule],
  exports: [...components],
})
export class MapModule {}
