import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { IBranding } from '@core/interface/branding/IBranding';
import { BuilderService } from '@core/service/builder.service';
import { NodeService } from '@core/service/node.service';
import { BuilderState } from '@core/state/BuilderState';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-builder-settings',
  templateUrl: './builder-settings.component.html',
  styleUrls: ['./builder-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderSettingsComponent implements OnInit {
  content$: Observable<any>;
  loading: boolean;
  branding: IBranding;
  private builder = inject(BuilderState);
  private destroyRef = inject(DestroyRef);
  private nodeService = inject(NodeService);
  private builderService = inject(BuilderService);
  constructor() {}

  ngOnInit(): void {
    this.getNodeJson();
  }

  onAfterExpand(): void {
    this.builder.cancelFixedShowcase();
  }

  getNodeJson(): void {
    this.loading = true;
    this.content$ = this.nodeService.fetch('/api/v2/node/core', 'noCache=1');
  }

  onJson(page: any): void {
    this.builderService.loadNodeJson({
      langcode: page.langcode,
      nid: page.nid,
      uuid: page.uuid,
    });
  }
}
