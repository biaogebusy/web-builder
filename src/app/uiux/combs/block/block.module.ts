import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block/block.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { ActivatedRoute } from '@angular/router';
import { pageContentFactory } from '@core/factory/factory';
import { ContentService } from '@core/service/content.service';
import { ContentState } from '@core/state/ContentState';
import { PAGE_CONTENT } from '@core/token/token-providers';
@NgModule({
  declarations: [BlockComponent, DynamicComponentComponent],
  imports: [CommonModule, MatSidenavModule, MatProgressSpinnerModule],
  providers: [
    {
      provide: PAGE_CONTENT,
      useFactory: pageContentFactory,
      deps: [ActivatedRoute, ContentService, ContentState],
    },
  ],
  exports: [BlockComponent],
})
export class BlockModule {}
