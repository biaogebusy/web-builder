import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import type { IShowcase2v1 } from '@core/interface/combs/IShowcase';
import { BaseComponent } from '@uiux/base/base.widget';
import { NodeService } from '@core/service/node.service';
import { catchError } from 'rxjs/operators';
import { ICard1v1 } from '@core/interface/widgets/ICard';
import { of } from 'rxjs';
@Component({
    selector: 'app-showcase-2v1',
    templateUrl: './showcase2v1.component.html',
    styleUrls: ['./showcase2v1.component.scss'],
    standalone: false
})
export class Showcase2v1Component extends BaseComponent implements OnInit, AfterViewInit {
  @Input() content: IShowcase2v1;
  elements: ICard1v1[];
  private nodeService = inject(NodeService);
  private cd = inject(ChangeDetectorRef);

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const api = this.getParams(this.content, 'api');
    const type = this.getParams(this.content, 'widget');
    if (api) {
      this.nodeService
        .fetch(api, '')
        .pipe(
          catchError(() => {
            return of([
              {
                title: 'Demo',
                time: '2022-10-27',
                src: '/assets/images/16-9/business-02.jpg',
                link: 'https://builder.design',
                user: 'Johnson',
              },
            ]);
          })
        )
        .subscribe(res => {
          if (type === 'card-1v1') {
            this.elements = res.map((item: any) => {
              return {
                type: 'card-1v1',
                link: {
                  href: item.href,
                  label: item.title,
                },
                user: item.user,
                time: item.time,
                feature: {
                  fullIcon: 'fullscreen',
                  openIcon: 'open_in_new',
                  link: item.link,
                  ratios: 'media-4-3',
                  img: {
                    classes: 'object-fit',
                    src: item.src,
                    alt: item.title,
                  },
                },
                moreLabel: '查看更多',
              };
            });
            this.cd.detectChanges();
          }
          if (type === 'card') {
            this.elements = res.map((item: any) => {
              return {
                type: 'card',
                subTitle: item.subTitle,
                avatar: {
                  src: item.src,
                  alt: '',
                },
                carousel: {
                  params: {
                    slidesPerView: 1,
                    navigation: false,
                    autoplay: {
                      delay: 5000,
                    },
                    breakpoints: null,
                  },
                  elements: [
                    {
                      type: 'feature-box',
                      hoverIcon: false,
                      fullIcon: 'fullscreen',
                      openIcon: 'open_in_new',
                      link: item.link,
                      ratios: 'media-4-3',
                      img: {
                        classes: 'object-fit',
                        src: item.src,
                        alt: item.title,
                      },
                    },
                  ],
                },
                link: {
                  href: item.link,
                  label: item.label,
                },
              };
            });
            this.cd.detectChanges();
          }
        });
    } else {
      this.elements = this.content.elements;
      this.cd.detectChanges();
    }
  }
}
