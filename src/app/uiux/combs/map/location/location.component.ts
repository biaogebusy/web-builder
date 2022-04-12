import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent implements OnInit {
  @Input() content: any;

  constructor() {}

  ngOnInit(): void {
    this.content.elements = this.content.elements.map((item: any) => {
      return {
        params: item.company,
      };
    });
  }
}
