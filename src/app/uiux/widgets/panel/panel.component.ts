import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  @Input() content: any;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  isAll = false;

  ngOnInit(): void {}
}
