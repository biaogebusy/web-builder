import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ILink } from '@core/interface/widgets/ILink';
import { RouteService } from '@core/service/route.service';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from '@core/service/utilities.service';
@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent implements OnInit, AfterViewInit {
  @Input() content: ILink;
  classes: any;
  href: string;
  constructor(
    public routeService: RouteService,
    private cd: ChangeDetectorRef,
    private util: UtilitiesService
  ) {}

  ngOnInit(): void {
    if (!this.content) {
      return;
    }
    this.getClasses();
    this.handlePrivate();
  }

  isAbsolute(href: string): boolean {
    return this.routeService.isAbsolute(href);
  }

  ngAfterViewInit(): void {
    this.handlePrivate();
  }

  getClasses(): void {
    const obj: any = {};
    if (this.content.classes) {
      obj[this.content.classes] = true;
    }
    if (this.content.href) {
      const type = this.util.getFileType(this.content.href);
      obj[type] = type || false;
    }
    this.classes = obj;
  }

  handlePrivate(): void {
    const href = this.content.href || 'javascript:void(0);';
    if (href && !href.startsWith('/system/')) {
      this.href = this.content.href;
      this.cd.detectChanges();
      return;
    }

    // drupal private file url
    this.href = `${environment.apiUrl}${href}`;
    this.cd.detectChanges();
  }
}
