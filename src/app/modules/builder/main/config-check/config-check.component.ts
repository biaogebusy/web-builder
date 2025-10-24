import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ApiTestResult, ConfigCheckService } from '@core/service/config-check.service';
import { API_CHECK_LIST } from './api-check-list';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-config-check',
  imports: [WidgetsModule],
  templateUrl: './config-check.component.html',
  styleUrl: './config-check.component.scss',
})
export class ConfigCheckComponent {
  public results = signal<ApiTestResult[]>([]);
  public totalCount = API_CHECK_LIST.length;
  public completedCount = signal(0);
  private destroyRef = inject(DestroyRef);
  private configCheckService = inject(ConfigCheckService);

  runTests(): void {
    this.results.set([]);
    this.completedCount.set(0);

    this.configCheckService.results$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: result => {
        this.results.set([...this.results(), result]);
        this.completedCount.update(count => count + 1);
      },
      complete: () => console.log('done'),
    });

    this.configCheckService.startCheck();
  }
}
