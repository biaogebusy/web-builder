import { AfterViewInit, Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
declare let window: any;
@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrl: './json.component.scss',
})
export class JsonFieldType extends FieldType<FieldTypeConfig> implements AfterViewInit {
  private screenService = inject(ScreenService);
  @ViewChild('jsoneditor', { read: ElementRef }) editor: ElementRef;

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
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
