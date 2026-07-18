import {
  Component,
  DestroyRef,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NodeService } from '@core/service/node.service';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormService } from '@core/service/form.service';
import { isEmpty, omitBy } from 'lodash-es';
import { BaseComponent } from '@uiux/base/base.widget';
import type { IHeaderSearch } from '@core/interface/branding/IBranding';
import { LinkComponent } from '@uiux/widgets/link/link.component';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTooltipModule,
    LinkComponent,
  ],
})
export class SearchBoxComponent extends BaseComponent implements OnInit {
  readonly content = input.required<IHeaderSearch>();

  form: UntypedFormGroup;
  readonly options = signal<{ label: string; href: string }[]>([]);
  nodeService = inject(NodeService);
  formService = inject(FormService);
  router = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initForm(this.content());
  }

  initForm(form: any): void {
    this.form = this.formService.toFormGroup([form]);
    this.onFormChange();
  }

  onFormChange(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(1000),
        map(value =>
          omitBy(
            Object.assign(
              {
                page: '0',
                loading: 0,
              },
              value
            ),
            isEmpty
          )
        ),
        distinctUntilChanged(
          (previous, current) => JSON.stringify(previous) === JSON.stringify(current)
        ),
        switchMap(params => this.nodeService.fetch('content', this.getApiParams(params))),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(data => {
        this.options.set(
          data.rows.map((item: any) => ({
            label: item.title,
            href: item.url,
          }))
        );
      });
  }

  onSelected(data: any): void {
    this.form.reset();
    this.router.navigate([`${data.option.value}`]);
  }

  search(value: any): void {
    this.form.reset();
    this.router.navigate(['search'], { queryParams: value });
  }
}
