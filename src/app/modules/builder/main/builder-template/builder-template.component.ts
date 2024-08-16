import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPage } from '@core/interface/IAppConfig';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { templates } from '@modules/builder/data/template-for-builder';

@Component({
  selector: 'app-builder-template',
  templateUrl: './builder-template.component.html',
  styleUrls: ['./builder-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderTemplateComponent implements OnInit {
  content: any[];
  private builder = inject(BuilderState);
  private dialog = inject(MatDialog);
  private util = inject(UtilitiesService);

  ngOnInit(): void {
    this.content = templates;
  }

  onNewPage(page: IPage): void {
    this.builder.loadNewPage(page);
    this.dialog.closeAll();
    this.util.openSnackbar(`正在加入${page.title}模板`, 'ok');
  }
}
