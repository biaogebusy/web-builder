import { Component, inject } from '@angular/core';
import { ApiTestResult, ConfigCheckService } from '@core/service/config-check.service';

@Component({
  selector: 'app-config-check',
  standalone: true,
  imports: [],
  templateUrl: './config-check.component.html',
  styleUrl: './config-check.component.scss',
})
export class ConfigCheckComponent {
  results: ApiTestResult[] = [];
  isLoading = false;
  private configCheckService = inject(ConfigCheckService);

  async runTests() {
    this.isLoading = true;
    this.results = await this.configCheckService.checkAllEndpoints();
    this.isLoading = false;
  }
}
