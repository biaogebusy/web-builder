import { Component, computed, input } from '@angular/core';
import { ILoading } from '@core/interface/widgets/IWidgets';

@Component({
  selector: 'app-loading',
  standalone: false,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  readonly content = input<ILoading>();
  readonly size = computed(() => `${this.content()?.size || 80}px`);
  readonly width = computed(() => `${Math.ceil((this.content()?.size || 80) / 10)}px`);
}
