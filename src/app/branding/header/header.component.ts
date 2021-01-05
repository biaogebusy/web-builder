import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ScreenService } from '../../service/screen.service';
import { ScreenState} from '../../mobx/screen/ScreenState.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('header', {read: ElementRef}) header: ElementRef;
  constructor(
    private screen: ScreenService,
    private screenState: ScreenState
  ) {

  }

  ngOnInit(): void {}

  ngAfterViewInit(){
    console.log(this.header)
    this.screenState.scroll$.subscribe(()=>{
      console.log(this.screen.isElementInViewport(this.header.nativeElement))
    })
  }
}
