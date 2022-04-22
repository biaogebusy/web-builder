import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ILink } from '@core/interface/widgets/ILink';
import { RouteService } from '@core/service/route.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent implements OnInit {
  @Input() content: ILink;
  classes: any;
  href: string;
  constructor(public routeService: RouteService) {}

  ngOnInit(): void {
    this.getClasses();
    this.handlePrivate();
  }

  isAbsolute(href: string): boolean {
    return this.routeService.isAbsolute(href);
  }

  getClasses(): void {
    const type = this.getFileType(this.content.href);
    const obj: any = {};
    obj[this.content.classes] = this.content.classes || false;
    obj[type] = type || false;
    this.classes = obj;
  }

  handlePrivate(): void {
    if (!this.content.href.startsWith('/system/')) {
      this.href = this.content.href;
    }
    this.href = `${environment.apiUrl}${this.content.href}`;
  }

  getFileType(url: string): string {
    const pdfReg = /^.+(\.pdf)$/;
    const txtReg = /^.+(\.txt)$/;
    const wordReg = /^.+(\.doc|\.docx)$/;
    const excelReg = /^.+(\.xls|\.xlsx)$/;
    const jpgReg = /^.+(\.png|\.jpg|\.jpeg|\.bmp)$/;
    if (pdfReg.test(url)) {
      return 'pdf';
    }
    if (txtReg.test(url)) {
      return 'txt';
    }
    if (wordReg.test(url)) {
      return 'word';
    }
    if (excelReg.test(url)) {
      return 'excel';
    }
    if (jpgReg.test(url)) {
      return 'picture';
    }
    return '';
  }
}
