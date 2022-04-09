import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-job-node',
  templateUrl: './job-node.component.html',
  styleUrls: ['./job-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobNodeComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
