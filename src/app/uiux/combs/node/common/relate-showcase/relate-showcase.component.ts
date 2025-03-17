import { Component, Input, OnInit } from '@angular/core';
import type { IRelateShowcase } from '@core/interface/node/IRelate';

@Component({
    selector: 'app-relate-showcase',
    templateUrl: './relate-showcase.component.html',
    styleUrls: ['./relate-showcase.component.scss'],
    standalone: false
})
export class RelateShowcaseComponent implements OnInit {
  @Input() content: IRelateShowcase;

  ngOnInit(): void {}
}
