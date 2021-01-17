import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share/share.module';
import {MatChipsModule} from '@angular/material/chips';
import { ChipListComponent } from './chip-list/chip-list.component';

const components = [
  ChipListComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    ShareModule,
  ],
  exports: [
    ...components
  ]
})
export class WidgetsModule { }
