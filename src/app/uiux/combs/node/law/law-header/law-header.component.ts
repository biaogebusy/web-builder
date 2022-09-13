import { formatDate } from '@angular/common';
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
    // @ts-ignore
    await import('../../../../../../assets/fonts/STSong-normal.js');
    const { jsPDF } = await import('jspdf');
    // example: http://raw.gimportithack.com/MrRio/jsPDF/master/index.html
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
    });
    doc.setFont('STSong');
    doc.setFontSize(16);
    autoTable(doc, {
      startY: 5,
      styles: {
        fillColor: [255, 255, 255],
        fontSize: 16,
        font: 'STSong',
        fontStyle: 'normal',
        textColor: [0, 0, 0],
        lineColor: 5,
        valign: 'middle',
      },
      tableLineWidth: 0.5,
      tableLineColor: 5,
      margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 30,
      },
      theme: 'grid',
      didDrawCell: (data: any) => {
        // logo
        if (
          data.row.index === 0 &&
          data.column.index === 0 &&
          data.cell.section === 'body'
        ) {
          const textPos = data.cell.getTextPos();
          doc.addImage(pdf.logo, textPos.x - 20, textPos.y, 67, 10);
        }
        // 签名图片
        if (
          data.row.index === pdf.sign.row &&
          data.column.index === pdf.sign.column &&
          data.cell.section === 'body'
        ) {
          console.log(data);
          const dim = data.cell.height - data.cell.padding('vertical');
          const textPos = data.cell.getTextPos();
          doc.addImage(pdf.sign.data, textPos.x, textPos.y - 10, 68, 20);
        }
      },
      body: pdf.table.body,
    });
    const finalY = (doc as any).lastAutoTable.finalY;
    const now = Date.now();
    const time = formatDate(new Date(), 'yyyy年MM月dd日 HH:mm', 'zh-Hans');
    doc.text(`打印日期：${time}`, 30, finalY + 15);

    // page number
    const internal: any = doc.internal;
    const pages = internal.getNumberOfPages();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);

    for (let j = 1; j < pages + 1; j++) {
      const horizontalPos = pageWidth / 2;
      const verticalPos = pageHeight - 5;
      doc.setPage(j);
      doc.text(`${j}/${pages}`, horizontalPos, verticalPos, {
        align: 'center',
      });
    }

    doc.output('dataurlnewwindow', { filename: 'sample.pdf' });
    // doc.save('sample.pdf');
  }
}
