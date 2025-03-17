import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { ITestimonial } from '@core/interface/widgets/IWidgets';

@Component({
    selector: 'app-testimonial',
    templateUrl: './testimonial.component.html',
    styleUrls: ['./testimonial.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TestimonialComponent implements OnInit {
  @Input() content: ITestimonial;
  constructor() {}

  ngOnInit(): void {}
}
