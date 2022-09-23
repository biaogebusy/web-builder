import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formly',
  templateUrl: './formly.component.html',
  styleUrls: ['./formly.component.scss'],
})
export class FormlyComponent implements OnInit {
  @Input() fields: any;
  @Input() form: FormGroup;
  @Input() model: any;

  @Output() modelChange: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onModelChange($event: any): void {
    this.modelChange.emit($event);
  }
}
