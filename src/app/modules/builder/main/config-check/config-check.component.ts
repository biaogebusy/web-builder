import { Component, inject } from '@angular/core';
import { ApiTestResult, ConfigCheckService } from '@core/service/config-check.service';
import { API_CHECK_LIST } from './api-check-list';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

@Component({
  selector: 'app-config-check',
  imports: [WidgetsModule],
  templateUrl: './config-check.component.html',
  styleUrl: './config-check.component.scss',
})
export class ConfigCheckComponent {
  public results: ApiTestResult[] = [];
  public totalCount = API_CHECK_LIST.length;
  public completedCount = 0;
  private configCheckService = inject(ConfigCheckService);

  runTests(): void {
    this.results = [];
    this.completedCount = 0;

    this.configCheckService.results$.subscribe({
      next: result => {
        this.results = [...this.results, result];
        this.completedCount++;
      },
      complete: () => console.log('done'),
    });

    this.configCheckService.startCheck();
  }
}
