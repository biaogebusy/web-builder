import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import type { IHero1v2 } from '@core/interface/combs/IHero';
@Component({
  selector: 'app-hero-1v2',
  templateUrl: './hero1v2.component.html',
  styleUrls: ['./hero1v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero1v2Component implements OnInit {
  @Input() content: IHero1v2;
  index = 0;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onSlideChange(event: any): void {
    this.index = event.activeIndex;
    this.cd.detectChanges();
  }
}
