import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAction, IActionParams, IControl } from 'src/app/core/interface/IForm';
import { UserState } from 'src/app/mobx/user/UserState';
import { DialogService } from 'src/app/core/service/dialog.service';
import { FormService } from 'src/app/core/service/form.service';
import { NodeService } from 'src/app/core/service/node.service';
import { UtilitiesService } from 'src/app/core/service/utilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formService.toFormGroup(this.content);
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
        },
        () => {
          this.loading = false;
          console.log('Please check user state.');
        }
      );
  }
}
