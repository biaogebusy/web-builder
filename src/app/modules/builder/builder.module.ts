import { NgModule } from '@angular/core';
import { BuilderComponent } from './builder.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BuilderListComponent } from './builder-list/builder-list.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShareModule } from '@share/share.module';
import { BuilderSidebarTopComponent } from './builder-sidebar-top/builder-sidebar-top.component';
import { BuilderContentToolbarComponent } from './builder-content-toolbar/builder-content-toolbar.component';
import { DragPreviewComponent } from './drag-preview/drag-preview.component';

const compoments = [BuilderComponent, BuilderListComponent];

@NgModule({
  declarations: [...compoments, BuilderSidebarTopComponent, BuilderContentToolbarComponent, DragPreviewComponent],
  imports: [ShareModule, MatSidenavModule, WidgetsModule, DragDropModule],
  exports: [...compoments],
})
export class BuilderModule {}
