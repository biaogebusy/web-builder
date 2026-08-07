import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { TagsService } from '@core/service/tags.service';
import { BuilderState } from '@core/state/BuilderState';
import { UIUX } from '@core/token/token-providers';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BuilderPanelComponent } from '../builder-panel/builder-panel.component';

@Component({
  selector: 'app-builder-uiux',
  templateUrl: './builder-uiux.component.html',
  styleUrls: ['./builder-uiux.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, BuilderPanelComponent],
})
export class BuilderUiuxComponent implements OnInit {
  private builder = inject(BuilderState);
  public uiux$ = inject(UIUX);
  private tagService = inject(TagsService);
  private destroyRef = inject(DestroyRef);
  private translate = inject(TranslateService);
  public libaries = signal<any[]>([]);

  ngOnInit(): void {
    this.tagService.setTitle(this.translate.instant('BUILDER.UIUX.PAGE_TITLE'));
    this.uiux$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(libaries => {
      if (libaries) {
        const [, ...uiux] = libaries;
        this.libaries.set(uiux);
      }
    });
  }

  onTabChange(): void {
    this.builder.cancelFixedShowcase();
  }
}
