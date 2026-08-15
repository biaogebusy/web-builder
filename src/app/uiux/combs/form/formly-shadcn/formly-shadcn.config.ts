import { InjectionToken } from '@angular/core';
import {
  ConfigOption,
  FormlyExtension,
  FormlyFieldConfig,
  FormlyFormOptions,
} from '@ngx-formly/core';

import { ShadcnCheckboxType } from './shadcn-checkbox.type';
import { ShadcnFormFieldWrapper } from './shadcn-form-field.wrapper';
import { ShadcnInputType } from './shadcn-input.type';
import { ShadcnMultiselectType } from './shadcn-multiselect.type';
import { ShadcnSelectType } from './shadcn-select.type';
import { ShadcnSliderType } from './shadcn-slider.type';
import { ShadcnTextareaType } from './shadcn-textarea.type';
import { ShadcnToggleType } from './shadcn-toggle.type';

export type FormUiTheme = 'material' | 'shadcn';

/**
 * Global default for the form UI theme. To switch the whole app to shadcn,
 * provide { provide: FORM_UI_THEME, useValue: 'shadcn' } at app level without
 * touching any field config; individual forms can still override via
 * formState.uiTheme.
 */
export const FORM_UI_THEME = new InjectionToken<FormUiTheme>('FORM_UI_THEME', {
  factory: () => 'material',
});

/**
 * Per-form shadcn switch: <formly-form [options]="xxxOptions" />.
 * Formly writes internal state into options, so every form instance must hold
 * its own object; hence a factory function instead of a shared constant.
 */
export function shadcnFormOptions(): FormlyFormOptions {
  return { formState: { uiTheme: 'shadcn' } };
}

// Built-in Material type names mapped to shadcn equivalents. Wrappers are also
// explicitly overridden so renamed fields never fall into Material's form-field wrapper.
const SHADCN_TYPE_MAP: Record<string, { type: string; wrappers: string[] }> = {
  'input': { type: 'shadcn-input', wrappers: ['shadcn-form-field'] },
  'string': { type: 'shadcn-input', wrappers: ['shadcn-form-field'] },
  'number': { type: 'shadcn-input', wrappers: ['shadcn-form-field'] },
  'integer': { type: 'shadcn-input', wrappers: ['shadcn-form-field'] },
  'textarea': { type: 'shadcn-textarea', wrappers: ['shadcn-form-field'] },
  // Single select; multiselect (props.multiple) is remapped to shadcn-multiselect in the extension
  'select': { type: 'shadcn-select', wrappers: ['shadcn-form-field'] },
  // Custom slider type (MatSlider) -> native range slider
  'slider': { type: 'shadcn-slider', wrappers: ['shadcn-form-field'] },
  // Composite controls: type unchanged, only a shadcn wrapper is added to render label/required marker/errors
  'img-picker': { type: 'img-picker', wrappers: ['shadcn-form-field'] },
  'json': { type: 'json', wrappers: ['shadcn-form-field'] },
  // toggle/checkbox have their own inline label, no field wrapper needed
  'toggle': { type: 'shadcn-toggle', wrappers: [] },
  'checkbox': { type: 'shadcn-checkbox', wrappers: [] },
  // Types not mapped: datepicker (zero business usage, and native date input has
  // different model semantics than Date objects), mat-select (advanced interactions
  // like search/API options/virtual scrolling, only exists in Material-mode forms).
  // The repeat composite type switches its button style itself via formState.uiTheme.
};

export const XINSHI_FORMLY_SHADCN_CONFIG: ConfigOption = {
  types: [
    { name: 'shadcn-input', component: ShadcnInputType, wrappers: ['shadcn-form-field'] },
    { name: 'shadcn-textarea', component: ShadcnTextareaType, wrappers: ['shadcn-form-field'] },
    { name: 'shadcn-select', component: ShadcnSelectType, wrappers: ['shadcn-form-field'] },
    {
      name: 'shadcn-multiselect',
      component: ShadcnMultiselectType,
      wrappers: ['shadcn-form-field'],
    },
    { name: 'shadcn-slider', component: ShadcnSliderType, wrappers: ['shadcn-form-field'] },
    { name: 'shadcn-toggle', component: ShadcnToggleType },
    { name: 'shadcn-checkbox', component: ShadcnCheckboxType },
  ],
  wrappers: [{ name: 'shadcn-form-field', component: ShadcnFormFieldWrapper }],
};

/**
 * Theme-switching extension: while building fields it rewrites the built-in types
 * in the map to shadcn implementations based on formState.uiTheme (falling back to
 * FORM_UI_THEME). Types outside the map pass through unchanged (repeat switches its
 * own button style via formState). Rewriting is idempotent: renamed fields no
 * longer match the map.
 */
export function registerShadcnThemeExtension(defaultTheme: FormUiTheme): ConfigOption {
  const extension: FormlyExtension = {
    prePopulate(field: FormlyFieldConfig): void {
      const theme: FormUiTheme = field.options?.formState?.uiTheme ?? defaultTheme;
      if (theme !== 'shadcn' || typeof field.type !== 'string') {
        return;
      }
      const target = SHADCN_TYPE_MAP[field.type];
      if (!target) {
        return;
      }
      if (field.type === 'select' && field.props?.multiple) {
        // Multiselect uses the custom shadcn combobox (native select has poor multiselect UX)
        field.type = 'shadcn-multiselect';
        field.wrappers = ['shadcn-form-field'];
        return;
      }
      if (field.type === 'number' || field.type === 'integer') {
        // number/integer semantics come from the defaultOptions registered on the original type; fill in before renaming
        field.props = { type: 'number', ...field.props };
      }
      field.type = target.type;
      field.wrappers = target.wrappers;
    },
  };
  return { extensions: [{ name: 'shadcn-theme', extension }] };
}
