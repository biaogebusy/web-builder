import { Component, OnInit, Input } from '@angular/core';
import { Router, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';
import { isEmpty, omitBy } from 'lodash';

@Component({
  selector: 'app-search-action',
  templateUrl: './search-action.component.html',
  styleUrls: ['./search-action.component.scss'],
})
export class SearchActionComponent implements OnInit {
  @Input() content: any;
  form: FormGroup;
  constructor(private router: Router, private formService: FormService) {}

  ngOnInit(): void {
    this.initForm(this.content.form);
  }

  initForm(form: any[]): void {
    this.form = this.formService.toFormGroup(form);
  }

  onSubmit(value: Params): void {
    const query = omitBy(value, isEmpty);
    if (!isEmpty(query)) {
      this.router.navigate(['/search'], { queryParams: query });
    }
  }
}
