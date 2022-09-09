import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service.js';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-law-header',
  templateUrl: './law-header.component.html',
  styleUrls: ['./law-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawHeaderComponent implements OnInit {
  @Input() content: any;
  constructor(private screenService: ScreenService) {}

  ngOnInit(): void {}

  async onSavePdf(): Promise<void> {
    const pdf = this.content.pdf;
    if (!pdf) {
      return;
    }
    if (this.screenService.isPlatformServer()) {
      return;
    }
    // @ts-ignore
    await import('../../../../../../assets/fonts/STHeiti-normal.js');
    const { jsPDF } = await import('jspdf');

    const doc = new jsPDF();
    doc.addImage(pdf.logo, 80, 5, 66, 10);
    doc.setFont('STHeiti');
    doc.setFontSize(18);
    doc.text(pdf.title, 60, 25);
    doc.setFontSize(18);
    doc.text(pdf.subTitle, 85, 35);
    doc.setFontSize(10);
    autoTable(doc, {
      startY: 45,
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
    const finalY = (doc as any).lastAutoTable.finalY;
    doc.text('打印日期：2022年9月8日16:43', 15, finalY + 5);

    doc.output('dataurlnewwindow', { filename: 'sample.pdf' });
    // doc.save('sample.pdf');
  }
}
