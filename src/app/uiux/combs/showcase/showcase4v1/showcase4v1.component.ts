import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { DialogService } from '@core/service/dialog.service';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import type { IUser } from '@core/interface/IUser';
import { USER } from '@core/token/token-providers';

@Component({
  selector: 'app-showcase4v1',
  templateUrl: './showcase4v1.component.html',
  styleUrls: ['./showcase4v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase4v1Component extends BaseComponent implements OnInit {
  @Input() content: any;
  elements: any[];
  constructor(
    private nodeService: NodeService,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService,
    @Inject(USER) public user: IUser
  ) {
    super();
  }

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
      .search(api, '')
      .pipe(
        catchError(() => {
          return of({
            rows: [],
          });
        })
      )
      .subscribe((res) => {
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
      this.dialogService.dialogState$.subscribe((state) => {
        if (!state) {
          this.getContentFormApi(api);
        }
      });
    }
  }
}
