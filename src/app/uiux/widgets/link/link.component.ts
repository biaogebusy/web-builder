import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ILink } from '@core/interface/widgets/ILink';
import { RouteService } from '@core/service/route.service';
@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent implements OnInit {
  @Input() content: ILink;
  constructor(public routeService: RouteService) {}

  ngOnInit(): void {}

  isAbsolute(href: string): boolean {
    return this.routeService.isAbsolute(href);
  }
}
