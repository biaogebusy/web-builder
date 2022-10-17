import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-showcase3v3',
  templateUrl: './showcase3v3.component.html',
  styleUrls: ['./showcase3v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase3v3Component implements OnInit, AfterViewInit {
  @Input() content: any;
  isShow: boolean;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.showImage();
  }

  showImage(): void {
    if (!this.content?.showImage && this.content.feature) {
      this.isShow = true;
      this.cd.detectChanges();
      return;
    }
    if (!this.content?.showImage) {
      this.isShow = false;
      this.cd.detectChanges();
      return;
    }
    this.isShow = true;
    this.cd.detectChanges();
  }
}
