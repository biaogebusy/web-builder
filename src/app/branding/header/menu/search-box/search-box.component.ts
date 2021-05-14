import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NodeService } from 'src/app/service/node.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  @Input() content: any;

  searchControl = new FormControl();
  options: any[] = [];
  subscribe: Subscription;
  constructor(private nodeService: NodeService) {}

  ngOnInit(): void {
    const $input = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged()
    );

    this.subscribe = $input.subscribe((res) => {
      this.nodeService.search(res).subscribe((data) => {
        console.log(data);
        this.options = data;
      });
    });
  }

  OnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
