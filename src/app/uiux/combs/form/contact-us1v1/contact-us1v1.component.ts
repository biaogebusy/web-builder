import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-contact-us-1v1',
  templateUrl: './contact-us1v1.component.html',
  styleUrls: ['./contact-us1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUs1v1Component extends BaseComponent implements OnInit {
  @Input() content: any;
  form: FormGroup = new FormGroup({});
  model: any = {};
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
