import { Component, Input, OnInit } from '@angular/core';
import { IControl } from '../../../interface/IForm';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
