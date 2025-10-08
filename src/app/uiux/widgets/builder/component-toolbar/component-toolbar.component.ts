import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { IPage } from '@core/interface/IAppConfig';
import { IDialog } from '@core/interface/IDialog';
import type { IComponentToolbar } from '@core/interface/combs/IBuilder';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CURRENT_PAGE } from '@core/token/token-providers';
import { getComponentSetting } from '@modules/builder/factory/getComponentSetting';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { get } from 'lodash-es';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, delay } from 'rxjs';

@Component({
  selector: 'app-component-toolbar',
  templateUrl: './component-toolbar.component.html',
  styleUrls: ['./component-toolbar.component.scss'],
  standalone: false,
})
export class ComponentToolbarComponent implements OnInit, AfterViewInit {
  private currentPage$ = inject<Observable<IPage>>(BUILDER_CURRENT_PAGE);

  @Input() content: IComponentToolbar;
  public index = signal(0);
  public length = signal(0);
  @HostBinding('class.component-toolbar') hostClass = true;

  public bcData = signal(false);

  private builder = inject(BuilderState);
  private storage = inject(LocalStorageService);
  private util = inject(UtilitiesService);
  private ele = inject(ElementRef);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  private currentPage: IPage;
  public type = signal('');
  private component = signal<any>(null);
  private path = signal('');

  ngOnInit(): void {
    this.storage
      .observe(this.builder.COPYCOMPONENTKEY)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.bcData.set(data);
      });
  }

  ngAfterViewInit(): void {
    this.type.set(this.content.type || this.content.content?.type || '');
    this.component.set(this.type() ? this.content : this.content.content);
    this.path.set(this.util.generatePath(this.ele.nativeElement));
    this.currentPage$.pipe(delay(500), takeUntilDestroyed(this.destroyRef)).subscribe(page => {
      this.currentPage = page;
      this.getIndex();
    });
  }

  getIndex(): void {
    const index = this.builder.targetIndex(this.path());
    this.index.set(index);
    const lastDotIndex = this.path().lastIndexOf('.');
    const body = this.currentPage.body;
    if (lastDotIndex !== -1) {
      // child component
      const before = this.path().slice(0, lastDotIndex);
      const targetArray = get(body, before);
      if (Array.isArray(targetArray)) {
        this.length.set(targetArray.length);
      }
    } else {
      // top parent component
      this.length.set(body.length);
    }
  }

  onUpdown(direction: string, event: any): void {
    this.builder.upDownComponent(direction, this.path());
    this.hiddenPicker();
  }

  onCopy(): void {
    const content = this.content.type ? this.content : this.content.content;
    if (content) {
      delete content.extra;
      delete content.relationships;
      this.util.copy(JSON.stringify(content));
      this.util.openSnackbar(`已复制${content.type}JSON`, 'ok', {
        verticalPosition: 'bottom',
      });
      this.storage.store(this.builder.COPYCOMPONENTKEY, content);
    }
  }

  onPaste(content: any): void {
    debugger;
    this.builder.updatePageContentByPath(this.path(), content, 'add');
    this.hiddenPicker();
    this.storage.clear(this.builder.COPYCOMPONENTKEY);
  }

  onSetting(event: any): void {
    const fields: FormlyFieldConfig[] = getComponentSetting(this.component(), this.path());
    this.hiddenPicker();
    this.dialog.getDialogById('code-editor-dialog')?.close();
    this.builder.showComponentSetting(this.component(), fields, this.path());
  }

  onDelete(event: any): void {
    const path = this.util.generatePath(event.target);
    const config: IDialog = {
      title: '删除组件',
      titleClasses: 'text-red-500',
      noLabel: '取消',
      yesLabel: '确认删除',
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: `是否要删除<strong class="text-black-500 text-primary">${this.content.type}</strong>组件？`,
        },
      },
    };

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '340px',
      data: config,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.hiddenPicker();
        this.builder.deleteComponent(path);
      }
    });
  }

  hiddenPicker(): void {
    this.builder.widgetsPicker$.next(false);
  }

  onEditorCode(): void {
    this.builder.editorCode({
      path: this.path(),
      content: {
        type: this.type(),
        content: this.component(),
      },
    });
  }
}
