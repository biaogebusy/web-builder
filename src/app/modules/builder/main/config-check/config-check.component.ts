import { Component, inject } from '@angular/core';
import { ApiTestResult, ConfigCheckService } from '@core/service/config-check.service';
import { API_CHECK_LIST, ApiEndpoint } from './api-check-list';
import { Subscription } from 'rxjs';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

@Component({
  selector: 'app-config-check',
  standalone: true,
  imports: [WidgetsModule],
  templateUrl: './config-check.component.html',
  styleUrl: './config-check.component.scss',
})
export class ConfigCheckComponent {
  results: ApiTestResult[] = [];
  isLoading = false;
  totalCount = API_CHECK_LIST.length;
  completedCount = 0;
  currentChecking: ApiEndpoint | null = null;

  private subscription!: Subscription;
  private configCheckService = inject(ConfigCheckService);

  runTests() {
    this.results = [];
    this.isLoading = true;
    this.completedCount = 0;

    this.subscription = this.configCheckService.results$.subscribe({
      next: result => {
        this.results = [...this.results, result];
        this.completedCount++;
        this.currentChecking = null;
      },
      complete: () => (this.isLoading = false),
    });

    API_CHECK_LIST.forEach((api, index) => {
      setTimeout(() => (this.currentChecking = api), index * 10);
    });

    this.configCheckService.startCheck();
  }
}
