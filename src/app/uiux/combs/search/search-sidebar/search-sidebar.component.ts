import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import type { ISearchLabel } from '@core/interface/combs/ISearch';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'app-search-sidebar',
    templateUrl: './search-sidebar.component.html',
    styleUrls: ['./search-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SearchSidebarComponent implements OnInit {
  @Input() fields: FormlyFieldConfig[];
  @Input() label: ISearchLabel;
  @Input() form: UntypedFormGroup;
  model: any = {};
  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  panelOpenState = true;
  private cd = inject(ChangeDetectorRef);

  ngOnInit(): void {}

  onModelChange(event: any): any {
    this.modelChange.emit(event);
  }

  clear(): void {
    this.form.reset();
    this.cd.detectChanges();
  }
}
