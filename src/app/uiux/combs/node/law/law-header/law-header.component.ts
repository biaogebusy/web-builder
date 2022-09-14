import { formatDate } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { ScreenService } from '@core/service/screen.service';
@Component({
  selector: 'app-law-header',
  templateUrl: './law-header.component.html',
  styleUrls: ['./law-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawHeaderComponent implements OnInit {
  @Input() content: any;
  saveDocLoading = false;
  constructor(
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  async onSavePdf(): Promise<void> {
    const pdf = this.content.pdf;
    if (!pdf) {
      return;
    }
    if (this.screenService.isPlatformServer()) {
      return;
    }
    this.saveDocLoading = true;
    // @ts-ignore
    // await import('../../../../../../assets/fonts/STHeiti-normal.js');
    // @ts-ignore
    // await import('../../../../../../assets/fonts/STSong-normal.js');
    await import('../../../../../../assets/fonts/FangSong-normal.js');
    // example: http://raw.githack.com/MrRio/jsPDF/master/index.html
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
    });
    doc.setFont('FangSong');
    doc.setFontSize(12);
    autoTable(doc, {
      startY: 24,
      tableLineWidth: 0,
      styles: {
        font: 'FangSong',
        fontStyle: 'bold',
        fontSize: 1,
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        valign: 'middle',
        halign: 'center',
        lineWidth: 0,
        cellWidth: 'auto',
        overflow: 'linebreak',
      },
      theme: 'grid',
      margin: {
        top: 24,
        right: 24,
        bottom: 24,
        left: 35,
      },
      body: pdf.table.header,
      didDrawCell: (data: any) => {
        // logo
        if (
          data.row.index === 0 &&
          data.column.index === 0 &&
          data.cell.section === 'body'
        ) {
          const textPos = data.cell.getTextPos();
          doc.addImage(pdf.logo.data, textPos.x - 33, textPos.y - 5, 67, 10);
        }
      },
    });
    let finalY = (doc as any).lastAutoTable.finalY;

    autoTable(doc, {
      startY: finalY,
      styles: {
        fillColor: [255, 255, 255],
        fontSize: 12,
        font: 'FangSong',
        textColor: [0, 0, 0],
        valign: 'middle',
        lineWidth: 0.2,
        lineColor: 5,
      },
      tableLineWidth: 0.2,
      tableLineColor: 5,
      margin: {
        top: 24,
        right: 24,
        bottom: 24,
        left: 35,
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
          doc.addImage(pdf.sign.data, textPos.x, textPos.y - 7, 47, 14);
        }
      },
      body: pdf.table.body,
    });

    finalY = (doc as any).lastAutoTable.finalY;
    const now = Date.now();
    const time = formatDate(new Date(), 'yyyy年MM月dd日 HH:mm', 'zh-Hans');
    doc.text(`打印日期：${time}`, 35, finalY + 15);

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
    this.saveDocLoading = false;
    doc.output('dataurlnewwindow', { filename: 'sample.pdf' });
    this.cd.detectChanges();
    // doc.save('sample.pdf');
  }
}
