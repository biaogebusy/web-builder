import { Component, Input, OnInit, Query } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1v1',
  templateUrl: './tab1v1.component.html',
  styleUrls: ['./tab1v1.component.scss'],
})
export class Tab1v1Component implements OnInit {
  @Input() content: any;
  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe((query: Query) => {
      this.initTab(query);
    });
  }

  initTab(query: Query): void {
    console.log(query);
  }
}
