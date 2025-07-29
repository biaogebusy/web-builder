import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TagsService } from '@core/service/tags.service';
import { BuilderState } from '@core/state/BuilderState';
import { UIUX } from '@core/token/token-providers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-builder-uiux',
  templateUrl: './builder-uiux.component.html',
  styleUrls: ['./builder-uiux.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BuilderUiuxComponent implements OnInit {
  private builder = inject(BuilderState);
  public uiux$ = inject<Observable<any[]>>(UIUX);
  private tagService = inject(TagsService);
  private destroyRef = inject(DestroyRef);
  public libaries = signal<any[]>([]);

  ngOnInit(): void {
    this.tagService.setTitle('页面编辑工作区');
    this.uiux$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(libaries => {
      const [first, ...uiux] = libaries;
      this.libaries.set(uiux);
    });
  }

  onTabChange(): void {
    this.builder.cancelFixedShowcase();
  }
}
