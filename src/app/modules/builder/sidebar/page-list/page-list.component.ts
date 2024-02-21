import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageListComponent implements OnInit {
  content$: Observable<any[]>;
  links: any;
  constructor(
    private nodeService: NodeService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const apiParams = new DrupalJsonApiParams();
    apiParams.addCustomParam({ noCache: true });

    apiParams
      .addPageLimit(10)
      .addSort('created', 'DESC')
      .addFilter('status', '1');
    const params = apiParams.getQueryString();

    this.content$ = this.nodeService.fetch('/node/landing_page', params).pipe(
      map((res) => {
        console.log(res);

        return this.getLists(res);
      })
    );
  }

  onPageChange(link: string): void {
    this.content$ = this.nodeService.getNodeByLink(link).pipe(
      map((res: any) => {
        return this.getLists(res);
      })
    );
  }

  getLists(res: any): any[] {
    this.links = res.links;
    this.cd.detectChanges();
    return res.data.map((item: any) => {
      const { attributes } = item;
      return {
        title: attributes.title,
        changed: attributes.changed,
        id: item.id,
      };
    });
  }
}
