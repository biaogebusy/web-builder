import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ScrollingModule } from '@angular/cdk/scrolling';

// icon utils
import { MatIconRegistry } from '@angular/material/icon';
import { loadSvgResources } from '../service/icon.util';
import { DomSanitizer } from '@angular/platform-browser';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDividerModule,
    FlexLayoutModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatExpansionModule,
    MatChipsModule,
    RouterModule,
    MatPaginatorModule,
    ScrollingModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDividerModule,
    FlexLayoutModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatListModule,
    MatTooltipModule,
    MatExpansionModule,
    MatChipsModule,
    MatPaginatorModule,
    ScrollingModule,
  ],
})
export class ShareModule {
  /**
   * @SkipSelf 让模块去父级寻找依赖，不然会造成死循环
   * @Optional 可选，如果CoreModule不存在正常执行
   * @param parent
   * @param iconRegistry
   * @param ds
   */
  constructor(
    @Optional() @SkipSelf() parent: ShareModule,
    iconRegistry: MatIconRegistry,
    ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error('Core 模块已经存在，不能再加载！');
    }
    // @ts-ignore
    loadSvgResources(iconRegistry, ds);
  }
}
