import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import type { IJsoneditor } from '@core/interface/widgets/IJsoneditor';
import { BuilderState } from '@core/state/BuilderState';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-jsoneditor',
  templateUrl: './jsoneditor.component.html',
  styleUrls: ['./jsoneditor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsoneditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: IJsoneditor;
  public editorOptions: JsonEditorOptions;
  public data: any;
  @ViewChild(JsonEditorComponent, { static: false })
  editor: JsonEditorComponent;
  value: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  valueChange$: Subject<any> = new Subject<any>();

  constructor(private builder: BuilderState) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code'; //set only one mode
  }
  ngOnInit(): void {
    this.data = this.content.data;
  }

  ngAfterViewInit(): void {
    this.valueChange$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.value = value;
        this.onSave();
      });
  }

  onChange(event: any): void {
    if (event.timeStamp) {
      return;
    }
    this.valueChange$.next(event);
  }

  onSave(): void {
    if (this.value) {
      // for page json
      if (this.content.isPage) {
        this.builder.initPage(this.value);
        return;
      }
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

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
  }
}
