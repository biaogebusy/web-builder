import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IBuilderComponent } from '@core/interface/IBuilder';
import type { IBranding } from '@core/interface/branding/IBranding';
import { ContentService } from '@core/service/content.service';
import { BuilderState } from '@core/state/BuilderState';
import { CORE_CONFIG } from '@core/token/token-providers';

@Component({
  selector: 'app-builder-panel',
  templateUrl: './builder-panel.component.html',
  styleUrls: ['./builder-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderPanelComponent implements OnInit {
  @Input() content: IBuilderComponent[];
  constructor(public builder: BuilderState, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.builder.fixedChange$.subscribe(() => {
      this.cd.detectChanges();
    });
  }

  onShowcase(content: any) {
    if (this.builder.fixedShowcase) {
      return;
    }
    this.builder.showcase(content);
  }

  onFixed(content: any): void {
    if (this.builder.fixedShowcase) {
      // click active
      if (content === this.builder.fixedContent) {
        this.builder.fixedShowcase = false;
        this.builder.showcase$.next(false);
        return;
      }

      // switch to other
      if (content !== this.builder.fixedContent) {
        this.builder.showcase(content);
        return;
      }
    }

    // set new active
    if (!this.builder.fixedShowcase) {
      this.builder.fixedShowcase = true;
      this.builder.showcase(content);
      return;
    }
  }

  hideShowcase(): void {
    if (!this.builder.fixedShowcase) {
      this.builder.showcase$.next(false);
    }
  }

  onMoved(): void {
    this.builder.showcase$.next(false);
  }

  onDragStarted(): void {
    this.builder.closeBuilderRightDrawer$.next(true);
    this.builder.switchPreivew$.next('none');
  }

  onAfterExpand(): void {
    this.builder.cancelFixedShowcase();
  }
}
