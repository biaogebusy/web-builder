import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-fix-bar',
  templateUrl: './fix-bar.component.html',
  styleUrls: ['./fix-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixBarComponent implements OnInit {
  @Input() content: any[] | undefined;
  constructor() {}

  ngOnInit(): void {}
}
