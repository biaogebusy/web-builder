import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { IBranding } from '@core/interface/branding/IBranding';
import { BRANDING } from '@core/token/token-providers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-builder-sidebar-top',
  templateUrl: './builder-sidebar-top.component.html',
  styleUrls: ['./builder-sidebar-top.component.scss'],
})
export class BuilderSidebarTopComponent implements OnInit {
  @Input() opened: boolean;
  @Input() drawer: MatDrawer;
  constructor(@Inject(BRANDING) public branding$: Observable<IBranding>) {}

  ngOnInit(): void {}
}
