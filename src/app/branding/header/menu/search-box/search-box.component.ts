import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NodeService } from 'src/app/service/node.service';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input() content: any;

  searchControl = new FormControl();
  options: any[] = [];
  subscribe: Subscription;
  constructor(private nodeService: NodeService, private router: Router) {}

  ngOnInit(): void {
    const $input = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged()
    );

    this.subscribe = $input.subscribe((key) => {
      if (key) {
        const params = [`keys=${key}`, `page=0`, 'loading=0'].join('&');
        this.nodeService.search(params).subscribe((data) => {
          this.options = data.rows.map((item: any) => {
            return {
              label: item.title,
              href: item.url,
            };
          });
        });
      }
    });
  }

  onSelected(data: any): void {
    this.searchControl.setValue('');
    this.router.navigate([`${data.option.value}`]);
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  search(key: string): void {
    console.log(key);
    this.router.navigate(['search'], { queryParams: { keys: key } });
  }
}
