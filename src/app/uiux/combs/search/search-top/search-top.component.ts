import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-search-top',
  templateUrl: './search-top.component.html',
  styleUrls: ['./search-top.component.scss'],
})
export class SearchTopComponent implements OnInit {
  @Input() content: any;
  @Output() selectChange = new EventEmitter();

  form: FormGroup;
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.initForm(this.content);
  }

  initForm(items: any[]): void {
    this.form = this.formService.toFormGroup(items);
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
      this.selectChange.emit(value);
    });
  }
}
