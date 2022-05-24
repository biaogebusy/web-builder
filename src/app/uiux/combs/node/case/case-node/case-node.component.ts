import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
@Component({
  selector: 'app-case-node',
  templateUrl: './case-node.component.html',
  styleUrls: ['./case-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseNodeComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
