import { Injectable, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ScreenService } from '@core/service/screen.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private ds = inject(DomSanitizer);
  private ir = inject(MatIconRegistry);
  private screenService = inject(ScreenService);
  private http = inject(HttpClient);

  loadSvgResources(): void {
    if (this.screenService.isPlatformServer()) {
      this.ir.addSvgIconSetLiteral(this.ds.bypassSecurityTrustHtml('<svg></svg>'));
    } else {
      // mdi
      // https://pictogrammers.com/docs/library/mdi/getting-started/angular/
      const mdiPath = '/assets/mdi.svg';
      this.ir.addSvgIconSet(this.ds.bypassSecurityTrustResourceUrl(mdiPath));

      // custom
      const svgPath = '/assets/icons/icons.svg';
      const url = this.ds.bypassSecurityTrustResourceUrl(svgPath);
      this.ir.addSvgIconSet(url);
    }
  }

  getIcons(): Observable<any> {
    return this.http.get('/assets/icons/codepoints', { responseType: 'text' }).pipe(
      map(data => {
        return data
          .split('\n')
          .filter(line => line.trim()) // 过滤空行
          .map(line => {
            return {
              label: line.split(' ')[0],
              value: line.split(' ')[0],
            };
          }); // 提取图标名称
      })
    );
  }
}
