import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fix-bar',
  templateUrl: './fix-bar.component.html',
  styleUrls: ['./fix-bar.component.scss'],
})
export class FixBarComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
