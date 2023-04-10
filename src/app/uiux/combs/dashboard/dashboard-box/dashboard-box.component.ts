import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '@core/service/form.service';

@Component({
  selector: 'app-dashboard-box',
  templateUrl: './dashboard-box.component.html',
  styleUrls: ['./dashboard-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardBoxComponent implements OnInit {
  @Input() content: any;
  @Input() form = new FormGroup({});
  @Input() model: any = {};
  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  onModelChange(value: any): void {
    const options = this.formService.handleRangeDate(value);
    this.getContent(options);
  }

  getContent(options = {}): void {
    console.log(options);
  }
}
