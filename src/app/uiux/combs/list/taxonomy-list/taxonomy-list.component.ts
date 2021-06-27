import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-taxonomy-list',
  templateUrl: './taxonomy-list.component.html',
  styleUrls: ['./taxonomy-list.component.scss'],
})
export class TaxonomyListComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
