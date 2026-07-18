import type { Provider } from '@angular/core';
import { NGX_MONACO_EDITOR_CONFIG, type NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';

export const MONACO_EDITOR_CONFIG: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
};

export const MONACO_EDITOR_CONFIG_PROVIDER: Provider = {
  provide: NGX_MONACO_EDITOR_CONFIG,
  useValue: MONACO_EDITOR_CONFIG,
};
