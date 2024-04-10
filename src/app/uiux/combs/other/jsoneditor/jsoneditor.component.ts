import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IPage } from '@core/interface/IAppConfig';
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
  loadding: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  valueChange$: Subject<any> = new Subject<any>();

  constructor(private builder: BuilderState, private cd: ChangeDetectorRef) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code'; //set only one mode
    this.editorOptions.enableTransform = false;
    this.editorOptions.enableSort = false;
  }
  ngOnInit(): void {
    this.data = this.content.data;
  }

  ngAfterViewInit(): void {
    this.valueChange$
      .pipe(
        debounceTime(1500),
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
    this.loadding = true;
    this.valueChange$.next(event);
    this.cd.detectChanges();
  }

  onSave(): void {
    if (this.value) {
      const { isPage, path } = this.content;
      // for page json
      if (isPage) {
        const page: IPage = this.value;
        this.builder.setCurrentPage(page);
      }

      if (path) {
        this.builder.updatePageContentByPath(path, this.value);
      }
      this.loadding = false;
      this.cd.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
  }
}
