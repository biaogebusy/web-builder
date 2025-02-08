import { Injectable, inject } from '@angular/core';
import { UtilitiesService } from '@core/service/utilities.service';

@Injectable({
  providedIn: 'root',
})
export class QiDianService {
  private utility = inject(UtilitiesService);

  loadQiDian(config: any): void {
    const src = `https://wp.qiye.qq.com/qidian/${config.id}/${config.key}`;
    const id = `qd${config.id}${config.key}`;
    this.utility.loadScript(src, id);
  }
}
