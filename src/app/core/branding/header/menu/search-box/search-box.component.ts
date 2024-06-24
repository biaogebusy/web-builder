import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { NodeService } from '@core/service/node.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormService } from '@core/service/form.service';
import { isEmpty, omitBy } from 'lodash-es';
import { BaseComponent } from '@uiux/base/base.widget';
import type { IHeaderSearch } from '@core/interface/branding/IBranding';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent extends BaseComponent implements OnInit {
  @Input() content: IHeaderSearch;

  form: UntypedFormGroup;
  options: any[] = [];
  nodeService = inject(NodeService);
  formService = inject(FormService);
  router = inject(Router);
  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.initForm(this.content);
  }

  initForm(form: any): void {
    this.form = this.formService.toFormGroup([form]);
    this.onFormChange();
  }

  onFormChange(): void {
    this.form.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        const params = omitBy(
          Object.assign(
            {
              page: '0',
              loading: 0,
            },
            value,
          ),
          isEmpty,
        );

        this.nodeService
          .fetch('content', this.getApiParams(params))
          .subscribe((data) => {
            this.options = data.rows.map((item: any) => {
              return {
                label: item.title,
                href: item.url,
              };
            });
            this.cd.detectChanges();
          });
      });
  }

  onSelected(data: any): void {
    this.form.reset();
    this.router.navigate([`${data.option.value}`]);
    this.cd.detectChanges();
  }

  trackByFn(index: number, item: any): number {
    return item.label;
  }

  search(value: any): void {
    this.form.reset();
    this.router.navigate(['search'], { queryParams: value });
    this.cd.detectChanges();
  }
}
