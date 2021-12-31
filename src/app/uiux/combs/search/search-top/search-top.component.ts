import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '@core/service/form.service';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-search-top',
  templateUrl: './search-top.component.html',
  styleUrls: ['./search-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTopComponent implements OnInit {
  @Input() content: any;
  @Output() selectChange = new EventEmitter();

  form: FormGroup;
  constructor(
    private formService: FormService,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.initForm(this.content);
    }
  }

  initForm(items: any[]): void {
    this.form = this.formService.toFormGroup(items);
    this.form.valueChanges.subscribe((value) => {
      this.selectChange.emit(value);
    });
    this.cd.detectChanges();
  }
}
