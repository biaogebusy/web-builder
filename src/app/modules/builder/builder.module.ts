import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderComponent } from './builder.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BuilderListComponent } from './builder-list/builder-list.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

const compoments = [BuilderComponent, BuilderListComponent];

@NgModule({
  declarations: [...compoments],
  imports: [CommonModule, MatSidenavModule, WidgetsModule, DragDropModule],
  exports: [...compoments],
})
export class BuilderModule {}
