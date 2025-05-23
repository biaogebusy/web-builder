import { AfterViewInit, Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
declare let window: any;
@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrl: './json.component.scss',
})
export class JsonFieldType extends FieldType<FieldTypeConfig> implements AfterViewInit {
  private screenService = inject(ScreenService);
  private util = inject(UtilitiesService);
  @ViewChild('jsoneditor', { read: ElementRef }) editor: ElementRef;

  async ngAfterViewInit(): Promise<void> {
    if (this.screenService.isPlatformBrowser()) {
      await this.util.loadStyle('/assets/injects/jsoneditor/jsoneditor.min.css');
      await this.util.loadScript('/assets/injects/jsoneditor/jsoneditor.min.js');

      const editor = new window.JSONEditor(this.editor.nativeElement, {
        mode: 'code',
        enableSort: false,
        enableTransform: false,
        onChange: () => {
          try {
            const json = editor.get();
            this.formControl.setValue(json);
          } catch (e) {}
        },
      });
    }
  }
}
