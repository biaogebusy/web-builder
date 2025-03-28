import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPage } from '@core/interface/IAppConfig';
import { BuilderService } from '@core/service/builder.service';
import { BuilderState } from '@core/state/BuilderState';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-builder-version',
  templateUrl: './builder-version.component.html',
  styleUrls: ['./builder-version.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BuilderVersionComponent implements OnInit {
  public version: IPage[] | undefined;

  private cd = inject(ChangeDetectorRef);
  private builder = inject(BuilderState);
  private storage = inject(LocalStorageService);
  private destroyRef = inject(DestroyRef);
  private builderService = inject(BuilderService);
  ngOnInit(): void {
    this.version = this.storage.retrieve('version');
    this.storage
      .observe('version')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((version: IPage[]) => {
        this.version = version;
        this.cd.detectChanges();
      });
  }

  onDelete(index: number): void {
    this.builder.deleteLocalPage(index);
  }

  onClearHistory(): void {
    this.builder.clearAllHistory();
  }

  onNewPage(): void {
    this.builder.onNewPage();
  }

  onVersion(page: IPage, index: number): void {
    this.builder.switchVersion(page, index);
    this.builderService.checkIsLatestPage(page);
  }

  onClickTitle(event: MouseEvent): any {
    event.stopPropagation();
  }

  onUpdateTitle(event: any, index: number): void {
    const {
      target: { textContent },
    } = event;
    if (textContent) {
      this.builder.version[index].title = textContent;
      this.builder.saveLocalVersions();
    }
  }
}
