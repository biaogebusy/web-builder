import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile1v1',
  templateUrl: './profile1v1.component.html',
  styleUrls: ['./profile1v1.component.scss'],
})
export class Profile1v1Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
