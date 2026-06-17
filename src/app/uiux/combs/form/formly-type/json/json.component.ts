import { AfterViewInit, Component, DestroyRef, ElementRef, inject, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ICoreConfig } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { JsonEditorDialogComponent } from './json-editor-dialog.component';
declare let window: any;
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrl: './json.component.scss',
  imports: [FormlyModule, BtnComponent],
})
export class JsonFieldType extends FieldType<FieldTypeConfig> implements AfterViewInit {
  private screenService = inject(ScreenService);
  private util = inject(UtilitiesService);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  readonly editor = viewChild('jsoneditor', { read: ElementRef });

  private editorInstance: any;

  async ngAfterViewInit(): Promise<void> {
    if (this.screenService.isPlatformBrowser()) {
      if (this.coreConfig.librariesUseLocal) {
        await this.util.loadStyle('/assets/injects/jsoneditor/jsoneditor.min.css');
        await this.util.loadScriptWithoutAmd('/assets/injects/jsoneditor/jsoneditor.min.js');
      } else {
        const jsoneditorStyle = this.util.getLibraries('jsoneditor', 'cdn', 'style');
        const jsoneditorJS = this.util.getLibraries('jsoneditor', 'cdn', 'script');
        await this.util.loadStyle(jsoneditorStyle);
        await this.util.loadScriptWithoutAmd(jsoneditorJS);
      }

      this.editorInstance = new window.JSONEditor(this.editor()!.nativeElement, {
        mode: 'code',
        enableSort: false,
        enableTransform: false,
        onChange: () => {
          try {
            const json = this.editorInstance.get();
            this.formControl.setValue(json);
          } catch {
            // value not parseable yet
          }
        },
      });

      const initial = this.formControl.value;
      if (initial !== undefined && initial !== null && initial !== '') {
        try {
          this.editorInstance.set(initial);
        } catch {
          // value not parseable yet
        }
      }
    }
  }

  openInDialog(): void {
    const ref = this.dialog.open(JsonEditorDialogComponent, {
      width: '90vw',
      maxWidth: '1200px',
      height: '85vh',
      data: {
        value: this.formControl.value,
        label: this.props?.label,
      },
    });
    ref
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result && 'value' in result) {
          this.formControl.setValue(result.value);
          if (this.editorInstance) {
            try {
              this.editorInstance.set(result.value);
            } catch {
              // value not parseable yet
            }
          }
        }
      });
  }
}
