import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserState } from 'src/app/mobx/user/UserState';
import { FormService } from 'src/app/service/form.service';
import { NodeService } from 'src/app/service/node.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() content: any;
  form: FormGroup;
  constructor(
    private formService: FormService,
    private nodeService: NodeService,
    private userState: UserState
  ) {}

  ngOnInit(): void {
    this.form = this.formService.toFormGroup(this.content);
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.nodeService
      .addNode('question', this.form.value, this.userState.currentUser)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
