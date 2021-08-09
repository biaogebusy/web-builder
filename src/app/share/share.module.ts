import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTreeModule } from '@angular/material/tree';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

// utils
import { NgPipesModule } from 'ngx-pipes';
import { MatIconRegistry } from '@angular/material/icon';
import { loadSvgResources } from '../service/icon.util';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

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
    MatTreeModule,
    MatCheckboxModule,
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
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    NgPipesModule,
    NgxPaginationModule,
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
    MatTreeModule,
    MatCheckboxModule,
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
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    NgPipesModule,
    NgxPaginationModule,
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
  constructor(iconRegistry: MatIconRegistry, ds: DomSanitizer) {
    // @ts-ignore
    loadSvgResources(iconRegistry, ds);
  }
}
