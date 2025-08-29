import { NgModule } from '@angular/core';
import { BlockComponent } from './block/block.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { pageContentFactory } from '@core/factory/factory';
import { PAGE_CONTENT } from '@core/token/token-providers';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { BuilderModule } from '../builder/builder.module';

@NgModule({
  declarations: [BlockComponent],
  imports: [ShareModule, WidgetsModule, MatSidenavModule, BuilderModule],
  providers: [
    {
      provide: PAGE_CONTENT,
      useFactory: pageContentFactory,
    },
  ],
  exports: [BlockComponent],
})
export class RenderModule {}
