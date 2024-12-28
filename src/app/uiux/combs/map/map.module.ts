import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { BaseModule } from '@uiux/base/base.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { LocationComponent } from './location/location.component';
import { MapListV1Component } from './map-list-v1/map-list-v1.component';
import { ViewMapComponent } from './view-map/view-map.component';
import { FormModule } from '@uiux/combs/form/form.module';
import { MapComponent } from './map/map.component';

const components = [LocationComponent, MapListV1Component, ViewMapComponent, MapComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, FormModule],

  exports: [...components],
})
export class MapModule extends BaseModule {
  dynamicComponents = [...components];

  static forStorybook(): any {
    return [...components];
  }
}
