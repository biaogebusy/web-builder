import { Component, inject, ChangeDetectionStrategy, input } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { IJSON } from '@core/interface/IBuilder';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrl: './json.component.scss',
  imports: [ShareModule],
})
export class JsonComponent {
  readonly content = input.required<IJSON>();
}
