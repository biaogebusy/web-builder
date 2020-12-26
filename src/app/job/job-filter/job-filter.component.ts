import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss'],
})
export class JobFilterComponent implements OnInit {
  @Input() content: any;
  @Output() regionChange = new EventEmitter();
  selectedValue: string = '';
  constructor() {}

  ngOnInit(): void {}

  onSelectRegion(event: any) {
    console.log(event);
    this.regionChange.emit(event.value);
  }
}
