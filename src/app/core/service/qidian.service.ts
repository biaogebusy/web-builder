import { Injectable } from '@angular/core';
import { AppState } from '../mobx/AppState';
import { UtilitiesService } from '@core/service/utilities.service';

@Injectable({
  providedIn: 'root',
})
export class QiDianService {
  constructor(private appState: AppState, private utility: UtilitiesService) {}

  loadQiDian(): void {
    const qiDianConfig = this.appState.config.qidian;
    const src = `https://wp.qiye.qq.com/qidian/${qiDianConfig.id}/${qiDianConfig.key}`;
    const id = `qd${qiDianConfig.id}${qiDianConfig.key}`;
    this.utility.loadScript(src, id);
  }
}
