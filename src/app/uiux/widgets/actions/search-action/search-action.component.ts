import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-action',
  templateUrl: './search-action.component.html',
  styleUrls: ['./search-action.component.scss'],
})
export class SearchActionComponent implements OnInit {
  @Input() content: any;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(key: string): void {
    this.router.navigate(['/search'], { queryParams: { keys: key } });
  }
}
