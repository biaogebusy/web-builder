import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IControl } from '@core/interface/widgets/IControl';
import { FormState } from '@core/mobx/FormState';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() content: IControl;
  @Input() form: FormGroup;
  autoLists: any[];
  constructor(private formState: FormState) {}

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
    this.formState.autoList$.subscribe((res: any[]) => {
      this.autoLists = res;
      console.log(this.autoLists);
    });
  }

  displayFn(item: any): string {
    return item.label;
  }
}
