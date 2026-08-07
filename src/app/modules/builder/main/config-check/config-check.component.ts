import { Component, DestroyRef, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ApiTestResult, ConfigCheckService } from '@core/service/config-check.service';
import { API_CHECK_LIST } from './api-check-list';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-config-check',
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS],
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
    });

    this.configCheckService.startCheck();
  }
}
