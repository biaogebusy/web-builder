import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AppState } from '../mobx/AppState';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    private ds: DomSanitizer,
    private ir: MatIconRegistry,
    private appState: AppState
  ) {}

  loadSvgResources(): void {
    const svgPath = '/assets/icons/icons.svg';
    const url = this.ds.bypassSecurityTrustResourceUrl(svgPath);
    this.ir.addSvgIconSet(url);
  }
}
