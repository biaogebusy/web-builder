import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ManageService } from '@core/service/manage.service';
import { UtilitiesService } from '@core/service/utilities.service';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageMediaComponent implements OnInit {
  content: any;
  constructor(
    private manageService: ManageService,
    private cd: ChangeDetectorRef,
    private utli: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): void {
    this.manageService.getFiles().subscribe((files) => {
      console.log(files);
      const iconPath = '/assets/icons';
      this.content = files.data.map((item: any) => {
        const attr = item.attributes;
        const type = this.utli.getFileType(attr.uri.url);
        if (type === 'picture') {
          return {
            type: 'feature-box',
            width: '20',
            fullIcon: 'fullscreen',
            ratios: 'media-4-3',
            hoverIcon: true,
            img: {
              classes: 'object-fit',
              src: attr.uri.url,
              alt: attr.filename,
            },
          };
        } else {
          return {
            type: 'feature-box',
            width: '20',
            fullIcon: 'fullscreen',
            ratios: 'media-4-3',
            hoverIcon: true,
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
      this.cd.detectChanges();
    });
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
