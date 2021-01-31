import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { ScreenState } from '../../mobx/screen/ScreenState';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  sticky = false;

  @ViewChild('menu', { read: ElementRef }) menu: ElementRef;
  constructor(
    private screen: ScreenService,
    private screenState: ScreenState
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.screenState.scroll$.subscribe(() => {
      this.sticky = this.screen.isElementOutTopViewport(
        this.menu.nativeElement
      );
    });
  }
}
