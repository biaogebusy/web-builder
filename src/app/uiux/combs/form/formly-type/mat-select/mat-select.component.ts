import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { NodeService } from '@core/service/node.service';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { of, ReplaySubject } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Component({
    selector: 'app-mat-select',
    templateUrl: './mat-select.component.html',
    styleUrls: ['./mat-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MatSelectComponent extends FieldType<FieldTypeConfig> implements OnInit {
  @ViewChild('select') select: MatSelect;
  /** control for the MatSelect filter keyword multi-selection */
  public searchCtrl: UntypedFormControl = new UntypedFormControl();
  /** list of banks filtered by search keyword */
  public filteredOptions: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  matOptions: any;
  fieldConfig: any;
  private nodeService = inject(NodeService);
  private cd = inject(ChangeDetectorRef);
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.fieldConfig = this.field;
    if (this.fieldConfig.props.api) {
      this.getOptionsFromApi();
    } else {
      this.matOptions = this.props.options || [];
      const { defaultValue } = this.fieldConfig;
      if (defaultValue) {
        this.formControl.setValue(defaultValue);
      }
      this.filteredOptions.next(this.matOptions.slice());
    }

    // listen for search field value changes
    this.searchCtrl.valueChanges.subscribe(() => {
      this.filterMulti();
    });
    this.cd.detectChanges();
  }

  getOptionsFromApi(): void {
    const { api, nocache, options } = this.fieldConfig.props;
    this.nodeService
      .fetch(api || '', nocache ? 'noCache=true' : '')
      .pipe(
        catchError(() => {
          return of({
            rows: [],
          });
        })
      )
      .subscribe(res => {
        this.matOptions = [...options, ...res.rows];
        // load the initial options
        this.filteredOptions.next(this.matOptions.slice());
        this.cd.detectChanges();
      });
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue(): void {
    this.filteredOptions.pipe(take(1)).subscribe(() => {
      // setting the compareWith property to a comparison function
      // triggers initializing the selection according to the initial value of
      // the form control (i.e. _initializeSelection())
      // this needs to be done after the filteredBanks are loaded initially
      // and after the mat-option elements are available
      this.select.compareWith = (a: any, b: any) => a && b && a.label === b.label;
    });
  }

  protected filterMulti(): void {
    if (!this.matOptions) {
      return;
    }
    // get the search keyword
    let search = this.searchCtrl.value;
    if (!search) {
      this.filteredOptions.next(this.matOptions.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the options
    this.filteredOptions.next(
      this.matOptions.filter((bank: any) => bank.label.toLowerCase().indexOf(search) > -1)
    );
  }
}
