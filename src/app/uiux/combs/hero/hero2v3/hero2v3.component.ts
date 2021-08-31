import { Component, Input, OnInit } from '@angular/core';
import { ScreenState } from 'src/app/mobx/screen/ScreenState';
import { AppState } from '../../../../mobx/AppState';

@Component({
  selector: 'app-hero2v3',
  templateUrl: './hero2v3.component.html',
  styleUrls: ['./hero2v3.component.scss'],
})
export class Hero2v3Component implements OnInit {
  @Input() content: any;
  constructor(public appState: AppState, public screen: ScreenState) {}

  ngOnInit(): void {}
}
