import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-text-hero',
  templateUrl: './text-hero.component.html',
  styleUrls: ['./text-hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextHeroComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
