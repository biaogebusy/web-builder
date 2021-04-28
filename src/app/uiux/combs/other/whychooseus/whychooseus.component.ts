import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-whychooseus',
  templateUrl: './whychooseus.component.html',
  styleUrls: ['./whychooseus.component.scss'],
})
export class WhychooseusComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
