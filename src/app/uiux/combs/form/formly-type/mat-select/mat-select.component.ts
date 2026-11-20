import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NodeService } from '@core/service/node.service';
import { IconService } from '@core/service/icon.service';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { of, ReplaySubject } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Component({
  selector: 'app-mat-select',
  templateUrl: './mat-select.component.html',
  styleUrls: ['./mat-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ScrollingModule,
    NgxMatSelectSearchModule,
    FormlyModule,
  ],
})
export class MatSelectComponent extends FieldType<FieldTypeConfig> implements OnInit {
  readonly select = viewChild<MatSelect>('select');
  /** control for the MatSelect filter keyword multi-selection */
  public searchCtrl: UntypedFormControl = new UntypedFormControl();
  /** list of banks filtered by search keyword */
  public filteredOptions: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public matOptions = signal<any>([]);
  fieldConfig: any;
  private nodeService = inject(NodeService);
  private iconService = inject(IconService);
  private destroyRef = inject(DestroyRef);
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.fieldConfig = this.field;
    if (this.fieldConfig.defaultValue) {
      this.formControl.setValue(this.fieldConfig.defaultValue);
    }
    if (this.fieldConfig.props.api || this.fieldConfig.props?.type === 'icon') {
      this.getOptionsFromApi();
    } else {
      this.matOptions.set(this.props.options || []);
      this.filteredOptions.next(this.matOptions().slice());
    }
    // listen for search field value changes
    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.filterMulti();
      });
  }

  getOptionsFromApi(): void {
    const { api, type, nocache, options = [] } = this.fieldConfig.props;
    if (type === 'icon') {
      this.setOptions([]);
      this.iconService
        .getIconNames()
        .pipe(catchError(() => of([])), takeUntilDestroyed(this.destroyRef))
        .subscribe(names => {
          this.setOptions(names.map(name => ({ label: name, value: name })));
          if (this.searchCtrl.value) {
            this.filterMulti();
          }
        });
    } else {
      this.nodeService
        .fetch(api || '', nocache ? 'noCache=true' : '')
        .pipe(
          catchError(() => {
            return of({
              rows: [],
            });
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(res => {
          this.setOptions([...options, ...res.rows]);
        });
    }
  }

  setOptions(options?: any[]): void {
    if (options) {
      this.matOptions.set([...options]);
      const value = this.formControl.value;
      // load the initial options
      this.filteredOptions.next([
        ...(value && !options.some(option => option.value === value)
          ? [{ label: value, value }]
          : []),
        ...this.matOptions().slice(),
      ]);
    }
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
      this.select()!.compareWith = (a: any, b: any) => a && b && a.label === b.label;
    });
  }

  protected filterMulti(): void {
    if (!this.matOptions) {
      return;
    }
    // get the search keyword
    let search = this.searchCtrl.value;
    if (!search) {
      this.filteredOptions.next(this.matOptions().slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the options
    this.filteredOptions.next(
      this.matOptions().filter((bank: any) => bank.label.toLowerCase().indexOf(search) > -1)
    );
  }
}
