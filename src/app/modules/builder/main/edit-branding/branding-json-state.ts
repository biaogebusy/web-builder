import type { WritableSignal } from '@angular/core';
import { formatBrandingJson, getBrandingJsonError, mergeBrandingJson } from './branding-json.util';

/** JSON state owned by one branding editor instance. */
interface BrandingJsonEditorState {
  jsonEditMode: WritableSignal<boolean>;
  jsonPreview: WritableSignal<string>;
  customJson: string;
  jsonError: WritableSignal<string>;
  markDirty(): void;
}

/** Refresh the generated JSON and live preview from the current section. */
export function updateBrandingJsonPreview<T extends object>(
  editor: BrandingJsonEditorState,
  build: () => T,
  preview: (section: T) => void
): void {
  try {
    const section = build();
    editor.jsonPreview.set(formatBrandingJson(section));
    preview(section);
  } catch {
    // Keep the previous preview while the form cannot build a valid section.
  }
}

/** Start each JSON editing session from the generated preview. */
export function toggleBrandingJsonEditMode(editor: BrandingJsonEditorState): void {
  if (!editor.jsonEditMode()) {
    editor.customJson = editor.jsonPreview();
    editor.jsonError.set('');
  }
  editor.jsonEditMode.set(!editor.jsonEditMode());
}

/** Retain invalid input as a draft while keeping the last valid live preview. */
export function changeBrandingJson<T extends object>(
  editor: BrandingJsonEditorState,
  value: string,
  build: () => T,
  preview: (section: T) => void
): void {
  editor.customJson = value;
  editor.markDirty();
  const error = getBrandingJsonError(value);
  editor.jsonError.set(error);
  if (!error) {
    try {
      preview(mergeBrandingJson(build(), value));
    } catch {
      // A valid JSON draft can outlive an incomplete section form.
    }
  }
}
