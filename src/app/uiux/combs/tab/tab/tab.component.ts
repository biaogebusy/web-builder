import { ChangeDetectorRef, Component, DestroyRef, OnInit, inject, ChangeDetectionStrategy, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import type { ITab } from '@core/interface/widgets/ITab';
import { BgImgComponent } from '@uiux/widgets/bg-img/bg-img.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { SpacerComponent } from '@uiux/widgets/spacer/spacer.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  imports: [MatTabsModule, SpacerComponent, TextComponent, BgImgComponent, DynamicComponentComponent],
})
export class TabComponent implements OnInit {
  readonly content = input<ITab>();
  selectedIndex: number | null;
  private route = inject(ActivatedRoute);
  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  constructor() {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(qp => {
      const { activeTabId } = qp;
      if (!activeTabId) {
        return;
      }
      this.content().elements.forEach((tab, index) => {
        if (tab.id === activeTabId) {
          this.selectedIndex = index;
          this.cd.detectChanges();
        }
      });
    });
  }
}
