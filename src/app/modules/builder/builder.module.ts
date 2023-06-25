import { NgModule } from '@angular/core';
import { BuilderComponent } from './builder.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShareModule } from '@share/share.module';
import { BuilderContentToolbarComponent } from './toolbar/builder-content-toolbar/builder-content-toolbar.component';
import { BuilderRoutingModule } from './builder-routing.module';
import { BuilderSidebarListComponent } from './sidebar/builder-sidebar-list/builder-sidebar-list.component';
import { BuilderShowcaseComponent } from './main/builder-showcase/builder-showcase.component';
import { BuilderSidebarComponentsComponent } from './sidebar/builder-sidebar-components/builder-sidebar-components.component';
import { BuilderSidebarWidgetsComponent } from './sidebar/builder-sidebar-widgets/builder-sidebar-widgets.component';
import { BuilderGeneraterComponent } from './main/builder-generater/builder-generater.component';
import { BuilderSampleComponent } from './sidebar/builder-sample/builder-sample.component';
import { BuilderListComponent } from './main/builder-list/builder-list.component';
import { BuilderEmptyComponent } from './main/builder-empty/builder-empty.component';
import { SwitchPreviewComponent } from './toolbar/switch-preview/switch-preview.component';
import { PreviewListComponent } from './main/preview-list/preview-list.component';
const compoments = [BuilderComponent, BuilderListComponent];

@NgModule({
  declarations: [
    ...compoments,
    BuilderContentToolbarComponent,
    BuilderSidebarListComponent,
    BuilderEmptyComponent,
    BuilderShowcaseComponent,
    BuilderSidebarComponentsComponent,
    BuilderSidebarWidgetsComponent,
    BuilderGeneraterComponent,
    SwitchPreviewComponent,
    BuilderSampleComponent,
    PreviewListComponent,
  ],
  imports: [
    ShareModule,
    MatSidenavModule,
    WidgetsModule,
    DragDropModule,
    BuilderRoutingModule,
  ],
  providers: [],
  exports: [...compoments],
})
export class BuilderModule {}
