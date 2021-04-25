import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inverse',
  templateUrl: './inverse.component.html',
  styleUrls: ['./inverse.component.scss'],
})
export class InverseComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
