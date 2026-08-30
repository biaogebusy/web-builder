import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectOption, FormlySelectOptionsPipe } from '@ngx-formly/core/select';
import { TranslateService } from '@ngx-translate/core';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';

import { ShadcnDropdownBase } from './shadcn-dropdown.base';

/** Sentinel value of the "create term" pseudo option (class member: the template can only see members) */
const CREATE_VALUE = '__create__';

/**
 * Combobox for taxonomy term fields whose field config enables handler
 * auto_create (e.g. tags): the panel carries a filter input, and a filter that
 * matches no existing term offers a "create" option. Selecting it POSTs the
 * term right away (same instant-creation semantics as Drupal's autocomplete
 * widget), merges the fresh term into the options, and selects it — so the
 * form value is always an existing term's uuid and the submit pipeline stays
 * unchanged. Supports single and multiple (props.multiple) like the sibling
 * shadcn dropdowns, which it shares behavior (.shad-popover/.shad-option) with.
 */
@Component({
  selector: 'formly-term-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, FormlyModule, FormlySelectOptionsPipe],
  host: { '(document:click)': 'onDocumentClick($event)' },
  template: `
    @let opts = (props.options | formlySelectOptions: field | async) ?? [];
    @let all = allOptions(opts);
    @let panel = panelOptions(all);
    <div class="term-wrap">
      <button
        type="button"
        class="shad-input term-trigger"
        role="combobox"
        aria-haspopup="listbox"
        [class.error]="showError"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="open() ? id + '-listbox' : null"
        [attr.aria-invalid]="showError || null"
        [attr.aria-describedby]="showError ? id + '-error' : null"
        [disabled]="formControl.disabled"
        [formlyAttributes]="field"
        (click)="toggleOpen(panel)"
        (keydown)="onKeydown($event, panel)"
      >
        @if (props.multiple) {
          <span class="term-values">
            @for (value of selectedValues; track $index) {
              <span class="shad-badge">{{ labelFor(all, value) }}</span>
            } @empty {
              <span class="term-placeholder">{{ props.placeholder || '' }}</span>
            }
          </span>
        } @else {
          @if (selectedLabel(all); as label) {
            <span class="term-value">{{ label }}</span>
          } @else {
            <span class="term-placeholder">{{ props.placeholder || '' }}</span>
          }
        }
        <svg class="chevron" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            d="M7 10l5 5 5-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      @if (open()) {
        <div class="shad-popover term-panel">
          <input
            #filterInput
            class="term-filter"
            type="text"
            autocomplete="off"
            [value]="filter()"
            [attr.aria-label]="filterLabel()"
            [attr.aria-controls]="id + '-listbox'"
            [attr.aria-activedescendant]="id + '-opt-' + activeIndex()"
            (input)="onFilterInput($event)"
            (keydown)="onFilterKeydown($event, panel)"
          />
          <!-- mousedown prevents the default behavior: focus stays in the filter input when clicking an option -->
          <ul
            class="term-list"
            role="listbox"
            [id]="id + '-listbox'"
            (mousedown)="$event.preventDefault()"
          >
            @for (opt of panel; track $index) {
              <li
                class="shad-option"
                role="option"
                tabindex="-1"
                [id]="id + '-opt-' + $index"
                [class.active]="$index === activeIndex()"
                [class.selected]="opt.value !== createValue && isSelected(opt.value)"
                [attr.aria-selected]="opt.value !== createValue && isSelected(opt.value)"
                [attr.aria-disabled]="creating() || null"
                (click)="commitOption(opt)"
                (keydown.enter)="commitOption(opt)"
                (mouseenter)="activeIndex.set($index)"
              >
                @if (opt.value === createValue) {
                  <span class="option-check create-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                      <path
                        d="M12 5v14M5 12h14"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span class="shad-option-label create-label">{{ opt.label }}</span>
                } @else {
                  <span class="option-check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                      <path
                        d="M5 13l4 4L19 7"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span class="shad-option-label">{{ opt.label }}</span>
                }
              </li>
            } @empty {
              <li class="term-empty" role="presentation">{{ emptyLabel() }}</li>
            }
          </ul>
        </div>
      }
    </div>
  `,
  styleUrl: './term-select.type.scss',
})
export class TermSelectType extends ShadcnDropdownBase {
  private nodeService = inject(NodeService);
  private util = inject(UtilitiesService);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  private filterInput = viewChild<ElementRef<HTMLInputElement>>('filterInput');

  /** Search text narrowing the options; also the name proposed for creation */
  readonly filter = signal('');
  /** Terms created in this session, merged into the option list */
  readonly extraOptions = signal<FormlySelectOption[]>([]);
  /** A term creation request is in flight */
  readonly creating = signal(false);
  /** Sentinel value of the create pseudo option; read from the template */
  readonly createValue = CREATE_VALUE;

  /** Form value is always treated as an array in multiple mode; odd backfills are normalized */
  get selectedValues(): unknown[] {
    const value = this.formControl.value;
    if (Array.isArray(value)) {
      return value;
    }
    return value === undefined || value === null || value === '' ? [] : [value];
  }

  isSelected(value: unknown): boolean {
    if (this.props.multiple) {
      return this.selectedValues.some(v => this.compareWith(v, value));
    }
    return this.compareWith(this.formControl.value, value);
  }

  labelFor(options: FormlySelectOption[], value: unknown): string {
    const opt = options.find(o => this.compareWith(o.value, value));
    return opt?.label ?? String(value ?? '');
  }

  selectedLabel(options: FormlySelectOption[]): string | null {
    const value = this.formControl.value;
    if (value === undefined || value === null || value === '') {
      return null;
    }
    return this.labelFor(options, value);
  }

  /** Existing options plus the terms created in this session */
  allOptions(options: FormlySelectOption[]): FormlySelectOption[] {
    return [...options, ...this.extraOptions()];
  }

  /** Options matching the filter, plus the create pseudo option when the filter names no existing term */
  panelOptions(options: FormlySelectOption[]): FormlySelectOption[] {
    const keyword = this.filter().trim().toLowerCase();
    const filtered = keyword
      ? options.filter(o => String(o.label ?? '').toLowerCase().includes(keyword))
      : options.slice();
    const name = this.createName(options);
    if (name) {
      filtered.unshift({
        label: this.translate.instant('BUILDER.NODE_ADD.TERM_CREATE', { name }),
        value: CREATE_VALUE,
      });
    }
    return filtered;
  }

  filterLabel(): string {
    return this.translate.instant('BUILDER.NODE_ADD.TERM_FILTER');
  }

  emptyLabel(): string {
    return this.translate.instant('BUILDER.NODE_ADD.TERM_EMPTY');
  }

  onFilterInput(event: Event): void {
    this.filter.set((event.target as HTMLInputElement).value);
  }

  /**
   * The filter input owns plain typing; only navigation/commit keys go to the
   * shared dropdown keyboard handling (letters fall through to filtering).
   */
  onFilterKeydown(event: KeyboardEvent, options: FormlySelectOption[]): void {
    if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' ', 'Escape', 'Tab'].includes(event.key)) {
      this.onKeydown(event, options);
    }
  }

  commitOption(option: FormlySelectOption): void {
    if (this.formControl.disabled) {
      return;
    }
    if (option.value === CREATE_VALUE) {
      // The create option's label is translated; recreate the raw name from the filter
      this.createTerm(this.filter().trim());
      return;
    }
    if (this.props.multiple) {
      const current = this.selectedValues;
      const next = this.isSelected(option.value)
        ? current.filter(v => !this.compareWith(v, option.value))
        : [...current, option.value];
      this.formControl.setValue(next);
      this.formControl.markAsDirty();
      // Panel stays open for multi selection, mirroring shadcn-multiselect
      return;
    }
    this.formControl.setValue(option.value);
    this.formControl.markAsDirty();
    this.close();
    this.filter.set('');
  }

  /**
   * The trimmed filter may name a new term when no existing option carries that
   * exact label (case-insensitive, like Drupal's autocomplete matching).
   */
  private createName(options: FormlySelectOption[]): string | null {
    const name = this.filter().trim();
    if (!name) {
      return null;
    }
    const taken = options.some(o => String(o.label ?? '').toLowerCase() === name.toLowerCase());
    return taken ? null : name;
  }

  /** POST the term, merge it into the options, and select it right away */
  private createTerm(name: string): void {
    const vocabulary = this.props['vocabulary'] as string | undefined;
    if (this.creating() || !vocabulary) {
      return;
    }
    this.creating.set(true);
    this.nodeService
      .addEntity(`/api/v1/taxonomy_term/${vocabulary}`, { name })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this.creating.set(false);
          const id = res?.data?.id;
          if (!id) {
            return;
          }
          this.extraOptions.update(list => [...list, { label: name, value: id }]);
          if (this.props.multiple) {
            this.formControl.setValue([...this.selectedValues, id]);
          } else {
            this.formControl.setValue(id);
            this.close();
          }
          this.formControl.markAsDirty();
          this.filter.set('');
        },
        error: err => {
          this.creating.set(false);
          const message = err?.error?.errors?.[0]?.detail || err?.message || '';
          this.util.openSnackbar(
            this.translate.instant('BUILDER.NODE_ADD.TERM_CREATE_FAILED', { name, message }),
            'ok'
          );
        },
      });
  }

  protected openPanel(options: FormlySelectOption[]): void {
    super.openPanel(options);
    // Focus after the panel renders so typing filters right away
    setTimeout(() => this.filterInput()?.nativeElement.focus());
  }
}
