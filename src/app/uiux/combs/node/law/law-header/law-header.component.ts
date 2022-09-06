import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import autoTable from 'jspdf-autotable';
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

  async onSavePdf(): Promise<void> {
    const pdf = this.content.pdf;
    if (!pdf) {
      return;
    }
    // @ts-ignore
    await import('../../../../../../assets/fonts/STHeiti-normal.js');
    const { jsPDF } = await import('jspdf');

    const doc = new jsPDF();
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
      didDrawCell: (data: any) => {
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
