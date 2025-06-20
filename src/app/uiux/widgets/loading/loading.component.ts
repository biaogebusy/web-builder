import { Component, Input } from '@angular/core';
import { ILoading } from '@core/interface/widgets/IWidgets';

@Component({
  selector: 'app-loading',
  standalone: false,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  @Input() content: ILoading | undefined;
}
