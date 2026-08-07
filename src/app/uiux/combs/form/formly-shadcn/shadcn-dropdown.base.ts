import { Directive, ElementRef, inject, signal } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { FormlySelectOption } from '@ngx-formly/core/select';

/**
 * shadcn 下拉(shadcn-select / shadcn-multiselect)的共享行为基类。
 * APG select-only combobox 模式:焦点始终保持在 role=combobox 的触发按钮上,
 * 面板为 role=listbox,键盘经 aria-activedescendant 导航,支持首字母
 * typeahead(闭合时先展开面板再定位高亮,不直接改值)。
 * 子类实现 isSelected 与 commitOption(单选=写值并关闭;多选=切换选中并
 * 保持打开),并在自身 host 上绑定 document:click → onDocumentClick。
 */
@Directive()
export abstract class ShadcnDropdownBase extends FieldType<FieldTypeConfig> {
  protected el = inject(ElementRef);
  readonly open = signal(false);
  readonly activeIndex = signal(0);

  /** 兜底与 Material select 的默认实现一致(o1 === o2),可被 props.compareWith 覆盖 */
  get compareWith(): (o1: unknown, o2: unknown) => boolean {
    return this.props.compareWith ?? ((o1: unknown, o2: unknown) => o1 === o2);
  }

  abstract isSelected(value: unknown): boolean;

  /** 确认当前选项:单选写值并关闭,多选切换选中 */
  abstract commitOption(option: FormlySelectOption): void;

  toggleOpen(options: FormlySelectOption[]): void {
    if (this.open()) {
      this.close();
    } else {
      this.openPanel(options);
    }
  }

  onKeydown(event: KeyboardEvent, options: FormlySelectOption[]): void {
    if (!this.open()) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        this.openPanel(options);
      } else if (this.typeaheadJump(event, options)) {
        event.preventDefault();
        this.open.set(true);
      }
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.set(Math.max(0, Math.min(options.length - 1, this.activeIndex() + 1)));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.set(Math.max(0, this.activeIndex() - 1));
        break;
      case 'Home':
        event.preventDefault();
        this.activeIndex.set(0);
        break;
      case 'End':
        event.preventDefault();
        this.activeIndex.set(Math.max(0, options.length - 1));
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        const option = options[this.activeIndex()];
        if (option) {
          this.commitOption(option);
        }
        break;
      }
      case 'Escape':
        // 打开时按 Esc 只收起面板,不冒泡给外层(如 dialog)
        event.preventDefault();
        event.stopPropagation();
        this.close();
        break;
      case 'Tab':
        this.close();
        break;
      default:
        if (this.typeaheadJump(event, options)) {
          event.preventDefault();
        }
    }
  }

  onDocumentClick(event: Event): void {
    if (this.open() && !this.el.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  protected openPanel(options: FormlySelectOption[]): void {
    this.activeIndex.set(Math.max(0, options.findIndex(o => this.isSelected(o.value))));
    this.open.set(true);
  }

  protected close(): void {
    if (!this.open()) {
      return;
    }
    this.open.set(false);
    this.formControl.markAsTouched();
  }

  /** 单字符前缀匹配,从当前高亮项之后循环查找并移动高亮 */
  private typeaheadJump(event: KeyboardEvent, options: FormlySelectOption[]): boolean {
    const key = event.key;
    if (
      key.length !== 1 ||
      key === ' ' ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      options.length === 0
    ) {
      return false;
    }
    const prefix = key.toLowerCase();
    const start = this.open() ? this.activeIndex() + 1 : 0;
    for (let offset = 0; offset < options.length; offset++) {
      const index = (start + offset) % options.length;
      if (
        String(options[index].label ?? '')
          .toLowerCase()
          .startsWith(prefix)
      ) {
        this.activeIndex.set(index);
        return true;
      }
    }
    return false;
  }
}
