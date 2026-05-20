import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import type { IShowcase4v1 } from '@core/interface/combs/IShowcase';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import { ReqRolesDirective } from '@core/directive/req-roles.directive';
import { DialogService } from '@core/service/dialog.service';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { ImgComponent } from '@uiux/widgets/img/img.component';
import { NumberAnimateComponent } from '@uiux/widgets/number-animate/number-animate.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  selector: 'app-showcase-4v1',
  templateUrl: './showcase4v1.component.html',
  styleUrls: ['./showcase4v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReqRolesDirective, TextComponent, IconComponent, ImgComponent, NumberAnimateComponent, ContenteditDirective],
})
export class Showcase4v1Component extends BaseComponent implements OnInit {
  private nodeService = inject(NodeService);
  private cd = inject(ChangeDetectorRef);
  private dialogService = inject(DialogService);

  @Input() content: IShowcase4v1;
  elements: any[];

  ngOnInit(): void {
    const api = this.getParams(this.content, 'api');
    if (!api) {
      this.elements = this.content.elements;
      this.cd.detectChanges();
    } else {
      this.getContentFormApi(api);
      this.handleDialogClosed(api);
    }
  }

  getContentFormApi(api: string): void {
    this.nodeService
      .fetch(api, '')
      .pipe(
        catchError(() => {
          return of({
            rows: [],
          });
        })
      )
      .subscribe(res => {
        this.elements = res.rows.map((item: any) => {
          return {
            icon: item.icon,
            digit: {
              value: item.value,
              from: item.from || 0,
              duration: item.duration || 4,
            },
            title: item.title,
          };
        });
        this.cd.detectChanges();
      });
  }

  handleDialogClosed(api: string): void {
    if (this.dialogService.dialogState$) {
      this.dialogService.dialogState$.subscribe(state => {
        if (!state) {
          this.getContentFormApi(api);
        }
      });
    }
  }
}
