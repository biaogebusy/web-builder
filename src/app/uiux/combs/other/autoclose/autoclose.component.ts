import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-autoclose',
  templateUrl: './autoclose.component.html',
  styleUrls: ['./autoclose.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DynamicComponentComponent],
})
export class AutocloseComponent implements OnInit {
  @Input() content: any;
  private destroyRef = inject(DestroyRef);
  constructor() {}

  ngOnInit(): void {
    const source = interval(2 * 1000);
    source.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      window.parent.postMessage('closeDialog', '*');
    });
  }
}
