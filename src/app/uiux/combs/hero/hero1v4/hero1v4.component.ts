import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-1v4',
  templateUrl: './hero1v4.component.html',
  styleUrls: ['./hero1v4.component.scss'],
})
export class Hero1v4Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
