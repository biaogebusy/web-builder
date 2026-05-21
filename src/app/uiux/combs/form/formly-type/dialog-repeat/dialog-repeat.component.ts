import {
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FieldArrayType, FormlyModule } from '@ngx-formly/core';
import type { ICustomTemplateDialog } from '@core/interface/IBuilder';
import { IDialog } from '@core/interface/IDialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

interface IScanStatus {
  total: number;
  mapped: number;
  unmapped: number;
  unmappedKeys: string[];
  orphanedKeys: string[];
}

@Component({
  selector: 'formly-dialog-repeat',
  templateUrl: './dialog-repeat.component.html',
  styleUrls: ['./dialog-repeat.component.scss'],
  imports: [FormlyModule, MatExpansionModule, MatIconModule, MatButtonModule],
})
export class DialogRepeatComponent extends FieldArrayType {
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  public expandedIndex = signal<number>(-1);
  public modelTick = signal(0);

  public scanStatus = computed<IScanStatus>(() => {
    this.modelTick();
    const html: string = this.field.props?.['html'] ?? '';
    const dialogs: ICustomTemplateDialog[] = this.formControl?.value ?? [];
    const triggers = new Set<string>();
    const re = /data-dialog=["']([^"']+)["']/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      if (m[1]) triggers.add(m[1]);
    }
    const configuredKeys = new Set(
      dialogs.map(d => d?.key).filter((k): k is string => !!k)
    );
    const unmappedKeys: string[] = [];
    triggers.forEach(t => {
      if (!configuredKeys.has(t)) unmappedKeys.push(t);
    });
    const orphanedKeys: string[] = [];
    configuredKeys.forEach(k => {
      if (!triggers.has(k)) orphanedKeys.push(k);
    });
    return {
      total: triggers.size,
      mapped: triggers.size - unmappedKeys.length,
      unmapped: unmappedKeys.length,
      unmappedKeys,
      orphanedKeys,
    };
  });

  ngOnInit(): void {
    this.formControl?.valueChanges
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.modelTick.update(v => v + 1));
  }

  getItemKey(i: number): string {
    return this.formControl?.value?.[i]?.key ?? '';
  }

  isDuplicate(i: number): boolean {
    const value = this.formControl?.value ?? [];
    const k = value[i]?.key;
    if (!k) return false;
    return value.some((d: any, idx: number) => idx !== i && d?.key === k);
  }

  onAdd(): void {
    this.add();
    const newIndex = (this.formControl?.value?.length ?? 1) - 1;
    this.expandedIndex.set(newIndex);
  }

  onRemove(i: number): void {
    const itemKey = this.getItemKey(i) || `#${i + 1}`;
    const config: IDialog = {
      title: '删除弹窗',
      titleClasses: 'text-red-500',
      noLabel: '取消',
      yesLabel: '确认删除',
      inputData: {
        content: {
          type: 'text',
          fullWidth: true,
          body: `是否要删除弹窗 <strong class="text-primary">${itemKey}</strong>？`,
        },
      },
    };
    const ref = this.dialog.open(DialogComponent, {
      width: '340px',
      data: config,
    });
    ref.afterClosed().subscribe(result => {
      if (result) this.remove(i);
    });
  }

  onTest(i: number): void {
    const item: ICustomTemplateDialog | undefined = this.formControl?.value?.[i];
    if (!item) return;
    if (!item.content) {
      this.openInfo('请先填写弹窗内容（content）');
      return;
    }
    const inputData = Array.isArray(item.content)
      ? item.content
      : { content: item.content };
    const dialogData: IDialog = {
      disableActions: true,
      inputData,
    };
    const rawPanelClass = item.params?.panelClass;
    const panelClass = Array.isArray(rawPanelClass)
      ? rawPanelClass
      : typeof rawPanelClass === 'string' && rawPanelClass.trim()
        ? rawPanelClass.trim().split(/\s+/)
        : ['close-outside', 'dialog-p-0'];
    this.dialog.open(DialogComponent, {
      width: item.params?.width || 'auto',
      height: item.params?.height || 'auto',
      ...item.params,
      panelClass,
      data: dialogData,
    });
  }

  private openInfo(body: string): void {
    this.dialog.open(DialogComponent, {
      width: '340px',
      data: {
        disableActions: true,
        inputData: {
          content: { type: 'text', fullWidth: true, body },
        },
      } as IDialog,
    });
  }
}
