import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import type { IPage } from '@core/interface/IAppConfig';
import { ContentState } from '@core/state/ContentState';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent implements OnInit, AfterViewInit {
  @Input() content: IPage;
  @LocalStorage('page')
  page: IPage;
  constructor(
    private contentState: ContentState,
    private storage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.content = this.page;
  }

  ngAfterViewInit(): void {
    this.storage.observe(this.contentState.pageKey).subscribe((page) => {
      this.content = page;
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.contentState.dropComponent(event);
  }
}
