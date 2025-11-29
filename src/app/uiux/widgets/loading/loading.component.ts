import { Component, Input, OnInit, signal } from '@angular/core';
import { ILoading } from '@core/interface/widgets/IWidgets';

@Component({
  selector: 'app-loading',
  standalone: false,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit {
  @Input() content: ILoading | undefined;
  public size = signal<string>('');
  public width = signal<string>('');

  ngOnInit(): void {
    const size = this.content?.size || 80;
    this.size.set(`${size}px`);
    const width = Math.ceil(size / 10);
    this.width.set(`${width}px`);
  }
}
