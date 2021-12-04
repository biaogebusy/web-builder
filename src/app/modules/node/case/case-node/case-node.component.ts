import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '../../../../mobx/AppState';
@Component({
  selector: 'app-case-node',
  templateUrl: './case-node.component.html',
  styleUrls: ['./case-node.component.scss'],
})
export class CaseNodeComponent implements OnInit {
  @Input() content: any;
  constructor(public appState: AppState) {}

  ngOnInit(): void {}
}
