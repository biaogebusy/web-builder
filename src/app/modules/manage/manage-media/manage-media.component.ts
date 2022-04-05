import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ManageService } from '@core/service/manage.service';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-manage-media',
  templateUrl: './manage-media.component.html',
  styleUrls: ['./manage-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageMediaComponent implements OnInit {
  content: any;
  public myOptions: NgxMasonryOptions = {
    horizontalOrder: true,
    resize: true,
  };
  constructor(
    private manageService: ManageService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): void {
    this.manageService.getFiles().subscribe((files) => {
      console.log(files);
      this.content = files.data.map((item: any) => {
        const attr = item.attributes;
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
      });
      this.cd.detectChanges();
    });
  }
}
