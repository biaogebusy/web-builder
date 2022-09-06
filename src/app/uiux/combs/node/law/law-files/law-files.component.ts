import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { element } from 'protractor';

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
}
