import { Component, Input, inject } from '@angular/core';
import { IJSON } from '@core/interface/IBuilder';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrl: './json.component.scss',
})
export class JsonComponent {
  @Input() content: IJSON;
}
