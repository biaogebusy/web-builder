import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { IPaginationLinks } from '@core/interface/widgets/IPaginationLinks';
import { ManageService } from '@core/service/manage.service';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageMediaComponent implements OnInit {
  content: any;
  links: IPaginationLinks;
  destory$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private manageService: ManageService,
    private cd: ChangeDetectorRef,
    private utli: UtilitiesService,
    private screenService: ScreenService,
    private nodeService: NodeService
  ) {}

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): void {
    this.manageService
      .getFiles()
      .pipe(takeUntil(this.destory$))
      .subscribe((res) => {
        console.log(res);
        this.updateList(res);
      });
  }

  updateList(res: any): void {
    const { data, links } = res;
    const iconPath = '/assets/icons';
    this.content = data.map((item: any) => {
      const attr = item.attributes;
      const type = this.utli.getFileType(attr.uri.url);
      const widget = {
        id: item.id,
        type: 'feature-box',
        width: '20',
        fullIcon: 'fullscreen',
        ratios: 'media-4-3',
        hoverIcon: true,
      };
      if (type === 'picture') {
        return {
          ...widget,
          img: {
            classes: 'object-fit',
            src: attr.uri.url,
            alt: attr.filename,
          },
        };
      } else {
        return {
          ...widget,
          openIcon: 'file_download',
          link: attr.uri.url,
          img: {
            classes: 'object-fill p-x-lg p-y-lg',
            src:
              type === 'pdf'
                ? `${iconPath}/file-pdf.svg`
                : type === 'excel'
                ? `${iconPath}/file-excel.svg`
                : `${iconPath}/file-word.svg`,
            alt: attr.filename,
          },
        };
      }
    });
    this.links = links;
    this.cd.detectChanges();
  }

  onPageChange(link: string): void {
    this.screenService.gotoTop();
    this.nodeService
      .getNodeByLink(link)
      .pipe(takeUntil(this.destory$))
      .subscribe((res) => {
        this.updateList(res);
      });
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
