import { Component, Input, OnInit } from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-list-2v1',
  templateUrl: './list2v1.component.html',
  styleUrls: ['./list2v1.component.scss'],
})
export class List2v1Component implements OnInit {
  @Input() content: any;
  lists$: Observable<any>;
  constructor(private nodeService: NodeService) {}

  ngOnInit(): void {
    if (this.content?.params?.api) {
      this.getContent();
    } else {
      this.lists$ = of(this.content.elements);
    }
  }

  getContent(): void {
    const api = this.content.params.api;
    this.lists$ = this.nodeService.search(api, '').pipe(
      catchError(() => {
        return of({
          rows: [
            {
              title:
                'Cancer Biomarkers: Paving the Way for Better Lung Cancer Treatment',
              url: '#',
              subTitle: 'Science & Innovation',
              body: 'Advancements with cancer biomarkers are paving the way for better lung cancer treatments and personalization for patients.',
              img: '/assets/images/medical/showcase-03.jpg',
            },
            {
              title:
                'Maternal Immunization: Protecting Children from RSV and GBS',
              url: '#',
              subTitle: 'Science & Innovation',
              body: 'Scientists at the forefront of fetal health innovation are studying ways that vaccines given during pregnancy can continue to protect children in the months after birth.',
              img: '/assets/images/medical/showcase-04.jpg',
            },
          ],
        });
      }),
      map(({ rows }) => {
        let lists = [];
        lists = rows.map((item: any) => {
          return {
            link: {
              label: item.title,
              href: item.url,
            },
            subTitle: item.subTitle,
            body: item.body,
            img: {
              src: item.img,
              alt: item.title,
            },
          };
        });
        return lists;
      })
    );
  }
}
