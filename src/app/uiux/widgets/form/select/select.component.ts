import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import type { IControl } from '@core/interface/widgets/IControl';
import { NodeService } from '@core/service/node.service';
import { of, ReplaySubject } from 'rxjs';
import { catchError, shareReplay, take } from 'rxjs/operators';

// tslint:disable-next-line:max-line-length
// https://stackblitz.com/github/bithost-gmbh/ngx-mat-select-search-example?file=src%2Fapp%2Fexamples%2F02-multiple-selection-example%2Fmultiple-selection-example.component.ts

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit, AfterViewInit {
  @Input() content: IControl;
  @Input() form: FormGroup;
  @ViewChild('select') select: MatSelect;
  /** control for the MatSelect filter keyword multi-selection */
  public searchCtrl: FormControl = new FormControl();
  /** list of banks filtered by search keyword */
  public filteredOptions: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  options: {
    label: string;
    value: string;
  }[];
  constructor(
    private nodeService: NodeService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.content.api) {
      this.getOptionsFromApi();
    } else {
      this.options = this.content.options || [];
    }
    this.cd.detectChanges();
    // listen for search field value changes
    this.searchCtrl.valueChanges.subscribe(() => {
      this.filterMulti();
    });
  }

  ngAfterViewInit(): void {
    // 选择会有问题，暂时保留
    // this.setInitialValue();
  }

  getOptionsFromApi(): void {
    this.nodeService
      .search(this.content.api || '', '')
      .pipe(
        catchError(() => {
          return of({
            rows: [],
          });
        })
      )
      .subscribe((res) => {
        this.options = res.rows;
        // load the initial options
        this.filteredOptions.next(this.options.slice());
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
      this.select.compareWith = (a: any, b: any) =>
        a && b && a.label === b.label;
    });
  }

  protected filterMulti(): void {
    if (!this.options) {
      return;
    }
    // get the search keyword
    let search = this.searchCtrl.value;
    if (!search) {
      this.filteredOptions.next(this.options.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the options
    this.filteredOptions.next(
      this.options.filter(
        (bank) => bank.label.toLowerCase().indexOf(search) > -1
      )
    );
  }

  get isValid(): boolean {
    return this.form.controls[this.content.key].valid;
  }
}
