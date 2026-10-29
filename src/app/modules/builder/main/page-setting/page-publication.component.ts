import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { NodeFieldFormService, type INodeFormSchema } from '@core/service/node-field-form.service';
import { BuilderState } from '@core/state/BuilderState';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { combineLatest, of, Subject } from 'rxjs';
import { catchError, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';

interface PublicationPage {
  id: string;
  attributes: { langcode: string };
}

@Component({
  selector: 'app-page-publication',
  templateUrl: './page-publication.component.html',
  styleUrl: './page-publication.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, TranslatePipe, BtnComponent],
})
export class PagePublicationComponent {
  /** The saved page translation whose publication state is being edited. */
  readonly page = input.required<PublicationPage>();
  readonly state = new FormControl({ value: '', disabled: true }, { nonNullable: true });
  readonly selectedState = toSignal(this.state.valueChanges, { initialValue: '' });
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly loadFailed = signal(false);
  readonly notice = signal('');
  private readonly context = signal<{
    page: PublicationPage; schema: INodeFormSchema;
  } | null>(null);
  private readonly refresh$ = new Subject<void>();
  private readonly forms = inject(NodeFieldFormService);
  private readonly builderService = inject(BuilderService);
  private readonly nodes = inject(NodeService);
  private readonly builder = inject(BuilderState);
  private readonly translate = inject(TranslateService);
  readonly moderated = computed(() => this.context()?.schema.moderated ?? false);
  readonly writable = computed(() => {
    const schema = this.context()?.schema;
    return !!schema?.baseFields[schema.moderated ? 'moderation_state' : 'status'];
  });
  readonly options = computed(() => {
    const schema = this.context()?.schema;
    if (!schema) return [];
    const options = schema.states.map(option => ({ ...option, label: schema.moderated
      ? option.label : this.stateLabel(option.value) }));
    const current = schema.defaults.state;
    return options.some(option => option.value === current) ? options
      : [{ value: current, label: this.stateLabel(current) }, ...options];
  });
  readonly canSave = computed(() => {
    const context = this.context();
    return !!context && this.samePage(context.page) && this.writable()
      && !this.loading() && !this.saving()
      && this.selectedState() !== context.schema.defaults.state
      && context.schema.states.some(option => option.value === this.selectedState());
  });

  constructor() {
    combineLatest([toObservable(this.page), this.refresh$.pipe(startWith(undefined))]).pipe(
      tap(() => {
        this.loading.set(true);
        this.loadFailed.set(false);
        this.notice.set('');
        this.context.set(null);
        this.state.disable({ emitEvent: false });
      }),
      switchMap(([page]) => this.forms.getSchema('landing_page', page.id, page.attributes.langcode)
        .pipe(
          map(schema => ({ page, schema })),
          catchError(() => of(null))
        )),
      takeUntilDestroyed()
    ).subscribe(context => {
      this.context.set(context);
      this.loading.set(false);
      this.loadFailed.set(!context);
      this.state.setValue(context?.schema.defaults.state ?? '');
      if (this.writable() && !this.saving()) this.state.enable({ emitEvent: false });
    });
  }

  /** Rechecks the current account's publication permissions. */
  retry(): void {
    this.refresh$.next();
  }

  /** Saves only an allowed publication change, preserving unsaved canvas content. */
  save(): void {
    const context = this.context();
    if (!context || !this.canSave()) return;
    const { page, schema } = context;
    const field = schema.baseFields[schema.moderated ? 'moderation_state' : 'status'];
    const value = schema.moderated ? this.selectedState() : this.selectedState() === 'published';
    this.saving.set(true);
    this.notice.set('');
    this.state.disable({ emitEvent: false });
    this.builderService.updateAttributes(
      { uuid: page.id, langcode: page.attributes.langcode },
      '/api/v1/node/landing_page', { [field]: value }, {}
    ).pipe(
      switchMap(response => {
        if (!response || !schema.moderated) return of(response);
        // A pending revision can be unpublished while the default revision remains public.
        return this.nodes.fetch(`/api/v1/node/landing_page/${encodeURIComponent(page.id)}`, {
          'fields[node--landing_page]': schema.baseFieldNames.status ?? 'status',
        }, page.attributes.langcode).pipe(catchError(() => of({})));
      }),
      finalize(() => {
        this.saving.set(false);
        if (this.writable() && !this.loading()) this.state.enable({ emitEvent: false });
      })
    ).subscribe({
      next: response => {
        if (!response) {
          if (this.samePage(page)) this.notice.set('BUILDER.PAGE_SETTING.STATE_SAVE_FAILED');
          return;
        }
        const published = response.data?.attributes?.[schema.baseFieldNames.status ?? 'status'];
        if (typeof published === 'boolean') {
          this.builder.setPagePublication(
            { uuid: page.id, langcode: page.attributes.langcode }, published
          );
        }
        this.builder.updateSuccess$.next(true);
        if (this.samePage(page)) {
          this.retry();
          this.notice.set('BUILDER.PAGE_SETTING.STATE_SAVED');
        }
      },
      error: () => {
        if (this.samePage(page)) this.notice.set('BUILDER.PAGE_SETTING.STATE_SAVE_FAILED');
      },
    });
  }

  private samePage(page: PublicationPage): boolean {
    return this.page().id === page.id
      && this.page().attributes.langcode === page.attributes.langcode;
  }

  private stateLabel(state: string): string {
    return state === 'published' || state === 'unpublished'
      ? this.translate.instant(`BUILDER.NODE_ADD.STATE_${state.toUpperCase()}`) : state;
  }
}
