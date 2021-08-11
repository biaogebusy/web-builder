import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAction, IActionParams, IControl } from 'src/app/interface/IForm';
import { UserState } from 'src/app/mobx/user/UserState';
import { DialogService } from 'src/app/service/dialog.service';
import { FormService } from 'src/app/service/form.service';
import { NodeService } from 'src/app/service/node.service';
import { UtilitiesService } from 'src/app/service/utilities.service';

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
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.form = this.formService.toFormGroup(this.content);
  }

  onClick(params: IActionParams): void {
    console.log(this.form.value);
    this.loading = true;
    this.nodeService
      .addNode(params.type, this.form.value, this.userState.currentUser)
      .subscribe(
        (data) => {
          console.log(data);
          this.loading = false;
          this.utilitiesService.openSnackbar(params.snackMes || '成功发布！');
          setTimeout(() => {
            this.dialogService.closeDialog();
          }, 2000);
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
  }
}
