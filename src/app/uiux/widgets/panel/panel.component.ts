import { Component, Input, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss'],
    standalone: false
})
export class PanelComponent {
  @Input() content: any;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  isAll = false;

}
