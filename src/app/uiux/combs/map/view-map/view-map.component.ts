import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormService } from '@core/service/form.service';
import { merge } from 'lodash-es';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.scss'],
})
export class ViewMapComponent implements OnInit {
  @Input() content: any;
  form = new FormGroup({
    page: new FormControl(),
  });
  model: any = {};
  selectedId: string;
  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  onModelChange(value: any): void {
    this.form.get('page')?.patchValue(1, { onlySelf: true, emitEvent: false });
    const mergeValue = merge(value, this.form.getRawValue());
    const options = this.formService.handleRangeDate(mergeValue);
    // this.getViews(options);
  }

  clear(): void {
    this.form.reset();
  }

  onCard(item: any, i: number): void {}
}
