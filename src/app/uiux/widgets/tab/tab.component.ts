import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { ITab } from '@core/interface/widgets/ITab';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  standalone: false,
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
