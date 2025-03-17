import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-divider',
    templateUrl: './divider.component.html',
    styleUrls: ['./divider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DividerComponent implements OnInit {
  @Input() content: any;

  ngOnInit(): void {}
}
