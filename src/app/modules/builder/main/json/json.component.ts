import { Component, Input, inject } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { IJSON } from '@core/interface/IBuilder';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrl: './json.component.scss',
  imports: [ShareModule],
})
export class JsonComponent {
  @Input() content: IJSON;
}
