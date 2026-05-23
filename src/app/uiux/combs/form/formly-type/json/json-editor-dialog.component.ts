import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { CORE_CONFIG } from '@core/token/token-providers';

declare let window: any;

interface IJsonEditorDialogData {
  value: any;
  label?: string;
}

@Component({
  selector: 'app-json-editor-dialog',
  templateUrl: './json-editor-dialog.component.html',
  styleUrl: './json-editor-dialog.component.scss',
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
})
export class JsonEditorDialogComponent implements AfterViewInit {
  private screenService = inject(ScreenService);
  private util = inject(UtilitiesService);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private dialogRef = inject(MatDialogRef<JsonEditorDialogComponent>);
  data = inject<IJsonEditorDialogData>(MAT_DIALOG_DATA);

  @ViewChild('editorHost', { read: ElementRef }) editorHost!: ElementRef;

  private editor: any;
  errorMessage = '';

  async ngAfterViewInit(): Promise<void> {
    if (!this.screenService.isPlatformBrowser()) return;
    if (this.coreConfig.librariesUseLocal) {
      await this.util.loadStyle('/assets/injects/jsoneditor/jsoneditor.min.css');
      await this.util.loadScriptWithoutAmd('/assets/injects/jsoneditor/jsoneditor.min.js');
    } else {
      const jsoneditorStyle = this.util.getLibraries('jsoneditor', 'cdn', 'style');
      const jsoneditorJS = this.util.getLibraries('jsoneditor', 'cdn', 'script');
      await this.util.loadStyle(jsoneditorStyle);
      await this.util.loadScriptWithoutAmd(jsoneditorJS);
    }

    this.editor = new window.JSONEditor(this.editorHost.nativeElement, {
      mode: 'code',
      enableSort: false,
      enableTransform: false,
    });

    const initial = this.data?.value;
    if (initial !== undefined && initial !== null && initial !== '') {
      try {
        this.editor.set(initial);
      } catch (e) {}
    }
  }

  onSave(): void {
    try {
      const json = this.editor.get();
      this.dialogRef.close({ value: json });
    } catch (e: any) {
      this.errorMessage = e?.message || 'JSON 格式不正确';
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
