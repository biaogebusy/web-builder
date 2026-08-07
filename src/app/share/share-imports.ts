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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// utils
import { NgPipesModule } from 'ngx-pipes';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { CheckChildMenuActiveDirective } from '@core/directive/check-child-menu-active.directive';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import { TranslateModule } from '@ngx-translate/core';

export const SHARE_IMPORTS = [
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
  TranslateModule,
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
] as const;

export {
  RouterModule,
  CommonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatDividerModule,
  MatRippleModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatListModule,
  MatTooltipModule,
  MatExpansionModule,
  ScrollingModule,
  MatTabsModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTableModule,
  MatStepperModule,
  MatBadgeModule,
  MatSlideToggleModule,
  FormsModule,
  ReactiveFormsModule,
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  NgPipesModule,
  NgxPaginationModule,
  MatPaginatorModule,
  NgxSkeletonLoaderModule,
  ReqRolesDirective,
  CheckChildMenuActiveDirective,
  ContenteditDirective,
  TranslateModule,
};
