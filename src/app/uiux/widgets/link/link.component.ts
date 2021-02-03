import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input() content: any;
  constructor() { }

  ngOnInit(): void { }

  isAbsolute(href: string): boolean {
    if (!href) {
      return false;
    }
    return href.startsWith('http') || href.startsWith('https');
  }
}
