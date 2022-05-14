import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-meta',
  templateUrl: './card-meta.component.html',
  styleUrls: ['./card-meta.component.scss'],
})
export class CardMetaComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
