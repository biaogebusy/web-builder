import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-combs',
  templateUrl: './dynamic-combs.component.html',
  styleUrls: ['./dynamic-combs.component.scss']
})
export class DynamicCombsComponent implements OnInit {
  @Input() content: any;
  constructor() { }

  ngOnInit(): void {
  }

}
