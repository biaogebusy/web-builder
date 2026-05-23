import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import type { ITab } from '@core/interface/widgets/ITab';
import { BgImgComponent } from '@uiux/widgets/bg-img/bg-img.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { SpacerComponent } from '@uiux/widgets/spacer/spacer.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  imports: [MatTabsModule, SpacerComponent, TextComponent, BgImgComponent, DynamicComponentComponent],
})
export class TabComponent implements OnInit {
  @Input() content: ITab;
  selectedIndex: number | null;
  private route = inject(ActivatedRoute);
  private cd = inject(ChangeDetectorRef);
  constructor() {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(qp => {
      const { activeTabId } = qp;
      if (!activeTabId) {
        return;
      }
      this.content.elements.forEach((tab, index) => {
        if (tab.id === activeTabId) {
          this.selectedIndex = index;
          this.cd.detectChanges();
        }
      });
    });
  }
}
