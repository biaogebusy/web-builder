import { Component, inject, ChangeDetectionStrategy, input } from '@angular/core';
import { SHARE_IMPORTS } from '@share/share-imports';
import { IJSON } from '@core/interface/IBuilder';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrl: './json.component.scss',
  imports: [SHARE_IMPORTS],
})
export class JsonComponent {
  readonly content = input.required<IJSON>();
}
