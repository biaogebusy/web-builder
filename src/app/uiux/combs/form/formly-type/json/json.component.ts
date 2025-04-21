import { Component, OnInit, inject } from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-json',
  standalone: false,
  templateUrl: './json.component.html',
  styleUrl: './json.component.scss',
})
export class JsonFieldType extends FieldType<FieldTypeConfig> implements OnInit {
  public screenService = inject(ScreenService);

  public editorOptions: JsonEditorOptions;
  public data: any;
  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.editorOptions = new JsonEditorOptions();
      this.editorOptions.mode = 'code';
      this.editorOptions.enableTransform = false;
      this.editorOptions.enableSort = false;
    }
  }

  onChange(event: any): void {
    this.formControl.setValue(event);
  }
}
