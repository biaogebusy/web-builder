import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../../../../../assets/fonts/STSong-normal.js';
@Component({
  selector: 'app-law-header',
  templateUrl: './law-header.component.html',
  styleUrls: ['./law-header.component.scss'],
})
export class LawHeaderComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}

  onSavePdf(): void {
    const doc = new jsPDF();
    doc.setFont('STSong');
    doc.setFontSize(18);
    doc.text('单项项目法律合规审查意见', 70, 15);
    doc.setFontSize(10);
    doc.text('审查流水号：国药分 20220810002', 145, 25);
    autoTable(doc, {
      startY: 30,
      styles: {
        fillColor: [255, 255, 255],
        font: 'STSong',
        fontStyle: 'normal',
        textColor: [0, 0, 0],
      },
      theme: 'grid',
      body: [
        [
          {
            content: '项目名称',
            styles: {
              fontStyle: 'bold',
            },
          },
          {
            content: '购买药典',
            colSpan: 3,
          },
        ],
        [
          {
            content: '文件名称',
            styles: {
              fontStyle: 'bold',
            },
          },
          {
            content: '',
            colSpan: 3,
          },
        ],
        [
          {
            content: '合同甲方',
            styles: {
              fontStyle: 'bold',
            },
          },

          '国家药审长三角中心',
          {
            content: '合同乙方',
            styles: {
              fontStyle: 'bold',
            },
          },

          '北京优势有限公司',
        ],
        [
          {
            content: '业务类型',
            styles: {
              fontStyle: 'bold',
            },
          },

          '',
          {
            content: '业务时间',
            styles: {
              fontStyle: 'bold',
            },
          },
          '',
        ],
        [
          {
            content: '主办律师',
            styles: {
              fontStyle: 'bold',
            },
          },
          '',
          {
            content: '完工时间',
            styles: {
              fontStyle: 'bold',
            },
          },
          '',
        ],
        [
          {
            content: '经办人员',
            styles: {
              fontStyle: 'bold',
            },
          },
          {
            content: '',
            colSpan: 3,
          },
        ],
        [
          {
            content: '合同修改详情：\n\n见本意见附件',
            colSpan: 4,
            styles: {
              fontStyle: 'bold',
              minCellHeight: 40,
            },
          },
        ],
        [
          {
            content: '审查意见/法律咨询',
            colSpan: 4,
            styles: {
              fontStyle: 'bold',
              minCellHeight: 40,
            },
          },
        ],
        [
          {
            content: '审查结论',
            colSpan: 4,
            styles: {
              fontStyle: 'bold',
              minCellHeight: 50,
            },
          },
        ],
        [
          {
            content: '律师签字',
            styles: {
              fontStyle: 'bold',
            },
          },
          '杜长明',
          {
            content: '出具日期',
            styles: {
              fontStyle: 'bold',
            },
          },
          '2022年7月28日',
        ],
      ],
    });
    doc.output('dataurlnewwindow');
    // doc.save('sample.pdf');
  }
}
