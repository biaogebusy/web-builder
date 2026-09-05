import { Directive, ElementRef, inject, signal } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { FormlySelectOption } from '@ngx-formly/core/select';

/**
 * Shared behavior base class for the shadcn dropdowns (shadcn-select /
 * shadcn-multiselect). APG select-only combobox pattern: focus always stays on
 * the role=combobox trigger button, the panel is role=listbox, keyboard
 * navigation goes through aria-activedescendant, and first-letter typeahead is
 * supported (when closed, it opens the panel first and positions the highlight
 * without changing the value). Subclasses implement isSelected and commitOption
 * (single = write value and close; multi = toggle selection and keep open) and
 * bind document:click -> onDocumentClick on their own host.
 */
@Directive()
export abstract class ShadcnDropdownBase extends FieldType<FieldTypeConfig> {
  protected el = inject(ElementRef);
  readonly open = signal(false);
  readonly activeIndex = signal(0);

  /** Fallback matches Material select's default implementation (o1 === o2); can be overridden via props.compareWith */
  get compareWith(): (o1: unknown, o2: unknown) => boolean {
    return this.props.compareWith ?? ((o1: unknown, o2: unknown) => o1 === o2);
  }

  abstract isSelected(value: unknown): boolean;

  /** Commit the current option: single select writes the value and closes, multi select toggles the selection */
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
        // While open, Esc only collapses the panel; do not let it bubble to outer layers (e.g. dialog)
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

  /** Single-character prefix match; wraps around from the item after the current highlight and moves the highlight */
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
