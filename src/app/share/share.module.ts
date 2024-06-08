import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Material
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBadgeModule } from '@angular/material/badge';

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

// utils
import { NgPipesModule } from 'ngx-pipes';
import { NgxPaginationModule } from 'ngx-pagination';
import { IconService } from '@core/service/icon.service';
import {
  MatLegacyPaginatorIntl as MatPaginatorIntl,
  MatLegacyPaginatorModule as MatPaginatorModule,
} from '@angular/material/legacy-paginator';
import { MatPaginatorIntlCro } from '@core/service/paginator.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { throwError } from 'rxjs';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { CheckChildMenuActiveDirective } from '@core/directive/check-child-menu-active.directive';
import { ComponentService } from '@core/service/component.service';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { ContenteditDirective } from '@core/directive/contentedit.directive';

@NgModule({
  declarations: [
    ReqRolesDirective,
    CheckChildMenuActiveDirective,
    ContenteditDirective,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatRippleModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatExpansionModule,
    RouterModule,
    ScrollingModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    NgPipesModule,
    NgxPaginationModule,
    MatTableModule,
    NgxSkeletonLoaderModule,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDividerModule,
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
    ScrollingModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    NgPipesModule,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    NgxSkeletonLoaderModule,
    MatStepperModule,
    ReqRolesDirective,
    CheckChildMenuActiveDirective,
    ContenteditDirective,
  ],
  providers: [
    IconService,
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlCro,
    },
  ],
})
export class ShareModule {
  /**
   * @SkipSelf 让模块去父级寻找依赖，不然会造成死循环
   * @Optional 可选，如果CoreModule不存在正常执行
   */
  constructor(
    private iconService: IconService,
    private componentService: ComponentService,
    @Optional() @SkipSelf() parentModule: ShareModule
  ) {
    this.componentService.initUiuxModuleLoad();
    this.iconService.loadSvgResources();
    if (parentModule) {
      throwError('ShareModule already loaded!');
    }
  }
}
