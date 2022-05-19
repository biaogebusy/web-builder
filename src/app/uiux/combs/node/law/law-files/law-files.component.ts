import { Component, Input, OnInit } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-law-files',
  templateUrl: './law-files.component.html',
  styleUrls: ['./law-files.component.scss'],
})
export class LawFilesComponent implements OnInit {
  @Input() content: any;
  lists: any[];
  constructor() {}

  ngOnInit(): void {
    const other: any = {
      label: '其他文件',
      elements: [],
    };
    const lists = this.content.elements.filter((item: any) => {
      const label = item.label.trim();
      if (label === '律师合同') {
        other.elements.push(...item.elements);
        return false;
      }
      if (label === '开庭传票') {
        other.elements.push(...item.elements);
        return false;
      }
      if (label === '裁判文书') {
        other.elements.push(...item.elements);
        return false;
      }

      return true;
    });
    this.lists = [...lists, other];
  }
}
