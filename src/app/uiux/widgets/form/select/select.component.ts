import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IControl } from '@core/interface/widgets/IControl';
import { NodeService } from '@core/service/node.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() content: IControl;
  @Input() form: FormGroup;
  options: {
    label: string;
    value: string;
  }[];
  constructor(private nodeService: NodeService) {}

  ngOnInit(): void {
    if (this.content.api) {
      this.getOptionsFromApi();
      return;
    }
    this.options = this.content.options || [];
  }

  getOptionsFromApi(): void {
    this.nodeService.search(this.content.api || '', '').subscribe((res) => {
      this.options = res.rows;
    });
  }

  get isValid(): boolean {
    return this.form.controls[this.content.key].valid;
  }
}
