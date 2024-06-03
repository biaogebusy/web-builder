import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import type { IControl } from '@core/interface/widgets/IControl';
import { FormService } from '@core/service/form.service';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
  @Input() content: IControl;
  @Input() form: UntypedFormGroup;
  autoLists: any[];
  constructor(
    private formService: FormService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.content.mode === 'autocomplete') {
      this.form.controls[this.content.key].setValue({
        label: this.content.value,
      });
      this.getAutoList();
    }
  }

  get isValid(): boolean {
    return this.form.controls[this.content.key].valid;
  }

  getAutoList(): void {
    this.formService.autoList$.subscribe((res: any[]) => {
      this.autoLists = res;
      this.cd.detectChanges();
    });
  }

  displayFn(item: any): string {
    return item.label;
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
