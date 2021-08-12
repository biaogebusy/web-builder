import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IControl } from '../../../../interface/IForm';
import { FormService } from '../../../../service/form.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() content: IControl[];
  form: FormGroup;
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.form = this.formService.toFormGroup(this.content);
  }
}
