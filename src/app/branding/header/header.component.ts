import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { ScreenState } from '../../mobx/screen/ScreenState';
import { BrandingState } from '../../mobx/BrandingStare';
import { AppState } from '../../mobx/AppState';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  sticky = false;

  @ViewChild('header', { read: ElementRef }) header: ElementRef;
  @ViewChild('menu', { read: ElementRef }) menu: ElementRef;
  constructor(
    private screen: ScreenService,
    private screenState: ScreenState,
    public branding: BrandingState,
    public appState: AppState
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.screenState.scroll$.subscribe(() => {
      this.sticky = this.screen.isElementOutTopViewport(
        this.menu.nativeElement
      );
      if (this.appState?.pageConfig?.headerMode?.transparent) {
        this.windowScroll();
      }
    });
  }

  windowScroll(): void {
    const style = this.appState.pageConfig.headerMode.style;
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      this.header.nativeElement.classList.add('header-sticky');
      this.header.nativeElement.classList.remove(style);
    } else {
      this.header.nativeElement.classList.remove('header-sticky');
      this.header.nativeElement.classList.add(style);
    }
  }
}
