import { Component, Input, OnInit } from '@angular/core';
import { RouteService } from '../../../core/service/route.service';
@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input() content: any;
  constructor(public routeService: RouteService) {}

  ngOnInit(): void {}

  isAbsolute(href: string): boolean {
    return this.routeService.isAbsolute(href);
  }
}
