import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  output,
  input
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import type { ISearchLabel } from '@core/interface/combs/ISearch';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyComponent } from '@uiux/combs/form/formly/formly.component';

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
    MatDividerModule,
    FormlyComponent,
  ],
})
export class SearchSidebarComponent {
  readonly fields = input<FormlyFieldConfig[]>();
  readonly label = input<ISearchLabel>();
  readonly form = input<UntypedFormGroup>();
  model: any = {};
  readonly modelChange = output<any>();

  panelOpenState = true;
  private cd = inject(ChangeDetectorRef);


  onModelChange(event: any): any {
    this.modelChange.emit(event);
  }

  clear(): void {
    this.form().reset();
    this.cd.detectChanges();
  }
}
