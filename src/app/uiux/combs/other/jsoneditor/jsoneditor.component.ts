import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-jsoneditor',
  templateUrl: './jsoneditor.component.html',
  styleUrls: ['./jsoneditor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsoneditorComponent implements OnInit {
  @Input() content: any;
  public editorOptions: JsonEditorOptions;
  public data: any;
  @ViewChild(JsonEditorComponent, { static: false })
  editor: JsonEditorComponent;

  constructor() {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode
  }
  ngOnInit(): void {
    this.data = this.content.data;
  }

  getData(event: any): void {
    console.log(event);
  }
}
