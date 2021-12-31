import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAction, IActionParams, IControl } from '@core/interface/IForm';
import { UserState } from '@core/mobx/user/UserState';
import { DialogService } from '@core/service/dialog.service';
import { FormService } from '@core/service/form.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { Router } from '@angular/router';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit {
  @Input() content: IControl[];
  @Input() actions: IAction[];
  loading = false;
  form: FormGroup;
  constructor(
    private formService: FormService,
    private nodeService: NodeService,
    private userState: UserState,
    private dialogService: DialogService,
    private utilitiesService: UtilitiesService,
    private router: Router,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.form = this.formService.toFormGroup(this.content);
    }
  }

  onClick(params: IActionParams): void {
    this.loading = true;
    this.nodeService
      .addNode(params.type, this.form.value, this.userState.currentUser)
      .subscribe(
        (res) => {
          const link = this.nodeService.getNodePath(res.data.attributes);
          this.loading = false;
          this.utilitiesService.openSnackbar(params.snackMes || '成功发布！');
          setTimeout(() => {
            this.dialogService.closeDialog();
            this.router.navigate([link]);
          }, 2000);
          this.cd.markForCheck();
        },
        () => {
          this.loading = false;
          console.log('Please check user state.');
          this.cd.markForCheck();
        }
      );
  }
}
