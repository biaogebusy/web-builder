import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { TagsService } from '@core/service/tags.service';
import { BuilderState } from '@core/state/BuilderState';
import { UIUX } from '@core/token/token-providers';

@Component({
    selector: 'app-builder-uiux',
    templateUrl: './builder-uiux.component.html',
    styleUrls: ['./builder-uiux.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class BuilderUiuxComponent implements OnInit {
  builder = inject(BuilderState);
  uiux = inject(UIUX);
  tagService = inject(TagsService);

  ngOnInit(): void {
    this.tagService.setTitle('页面编辑工作区');
  }

  onTabChange(): void {
    this.builder.cancelFixedShowcase();
  }
}
