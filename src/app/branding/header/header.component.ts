import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { ScreenState } from '../../mobx/screen/ScreenState.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  sticky = false;

  @ViewChild('menu', { read: ElementRef }) menu: ElementRef;
  constructor(
    private screen: ScreenService,
    private screenState: ScreenState
  ) {

  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.screenState.scroll$.subscribe(() => {
      this.sticky = !this.screen.isElementInViewport(this.menu.nativeElement);
    });
  }
}
