import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../../../../../assets/fonts/STHeiti-normal.js';
@Component({
  selector: 'app-law-header',
  templateUrl: './law-header.component.html',
  styleUrls: ['./law-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawHeaderComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}

  onSavePdf(): void {
    const doc = new jsPDF();
    const pdf = this.content.pdf;
    if (!pdf) {
      return;
    }
    doc.setFont('STHeiti');
    doc.setFontSize(18);
    doc.text(pdf.title, 70, 15);
    doc.setFontSize(10);
    doc.text(pdf.subTitle, 140, 25);
    autoTable(doc, {
      startY: 30,
      styles: {
        fillColor: [255, 255, 255],
        font: 'STHeiti',
        fontStyle: 'normal',
        textColor: [0, 0, 0],
        lineColor: 5,
      },
      theme: 'grid',
      didDrawCell: (data) => {
        // 签名图片
        if (
          data.row.index === pdf.sign.row &&
          data.column.index === pdf.sign.column &&
          data.cell.section === 'body'
        ) {
          console.log(data);
          const dim = data.cell.height - data.cell.padding('vertical');
          const textPos = data.cell.getTextPos();
          doc.addImage(pdf.sign.data, textPos.x, textPos.y, dim, dim);
        }
      },
      body: pdf.table.body,
    });
    doc.output('dataurlnewwindow', { filename: 'sample.pdf' });
    // doc.save('sample.pdf');
  }
}
