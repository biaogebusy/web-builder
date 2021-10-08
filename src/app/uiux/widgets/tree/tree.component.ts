import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  nodes = [
    {
      value: 861,
      label: '民商诉讼',
      elements: [
        { value: 1164, label: '互联网股权众筹纠纷' },
        { value: 1165, label: '以金融机构为债务人的破产纠纷' },
        {
          value: 875,
          label: '证券纠纷',
          elements: [
            {
              value: 1167,
              label: '客户交易结算资金纠纷',
            },
          ],
        },
      ],
    },
    {
      value: 1006,
      label: '公司',
      elements: [
        { value: 1030, label: '上市公司收购纠纷' },
        { value: 1018, label: '发起人责任纠纷' },
      ],
    },
  ];

  options = {
    idField: 'value',
    displayField: 'label',
    childrenField: 'elements',
  };
  constructor() {}

  ngOnInit(): void {}

  onActivate(event: any): void {
    console.log(event);
  }
}
