import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/uiux/base/base.widget';

@Component({
  selector: 'app-taxonomy-thin-list',
  templateUrl: './taxonomy-thin-list.component.html',
  styleUrls: ['./taxonomy-thin-list.component.scss'],
})
export class TaxonomyThinListComponent extends BaseComponent implements OnInit {
  @Input() content: any;
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
