import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import type { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import { BuilderState } from '@core/state/BuilderState';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-jsoneditor',
  templateUrl: './jsoneditor.component.html',
  styleUrls: ['./jsoneditor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsoneditorComponent implements OnInit {
  @Input() content: IJsoneditor;
  public editorOptions: JsonEditorOptions;
  public data: any;
  @ViewChild(JsonEditorComponent, { static: false })
  editor: JsonEditorComponent;
  value: any;

  constructor(private builder: BuilderState) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'view']; // set all allowed modes
    this.editorOptions.mode = 'code'; //set only one mode
  }
  ngOnInit(): void {
    this.data = this.content.data;
  }

  onChange(event: any): void {
    console.log(event);
    if (event.timeStamp) {
      return;
    }
    this.value = event;
    this.onSave();
  }

  onSave(): void {
    if (this.value) {
      // for builder
      if (this.content.isPreview) {
        this.builder.updateComponent(this.content.index, this.value);
      } else {
        // for single component preview(storybook)
        // reload component conent
        this.builder.jsoneditorContent$.next({
          content: this.value,
          index: this.content.index,
          uuid: this.content.uuid,
        });
      }
    }
  }
}
