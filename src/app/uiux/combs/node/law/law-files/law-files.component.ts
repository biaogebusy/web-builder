import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-law-files',
  templateUrl: './law-files.component.html',
  styleUrls: ['./law-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawFilesComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}

  trackByFn(index: number, item: any): number {
    return index;
  }
}
