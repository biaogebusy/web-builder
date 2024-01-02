import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBadgeModule } from '@angular/material/badge';

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// utils
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgPipesModule } from 'ngx-pipes';
import { NgxPaginationModule } from 'ngx-pagination';
import { IconService } from '@core/service/icon.service';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatPaginatorIntlCro } from '@core/service/paginator.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { throwError } from 'rxjs';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { CheckChildMenuActiveDirective } from '@core/directive/check-child-menu-active.directive';
import { ComponentService } from '@core/service/component.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
    FlexLayoutModule,
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
    FlexLayoutModule,
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
