import {
  Component,
  OnInit,
  Input,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Router, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormService } from '@core/service/form.service';
import { isEmpty, omitBy } from 'lodash';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-search-action',
  templateUrl: './search-action.component.html',
  styleUrls: ['./search-action.component.scss'],
})
export class SearchActionComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  form: FormGroup;
  constructor(
    private router: Router,
    private formService: FormService,
    private ele: ElementRef
  ) {}

  ngOnInit(): void {
    this.initForm(this.content.form);
  }

  initForm(form: any[]): void {
    this.form = this.formService.toFormGroup(form);
  }

  ngAfterViewInit(): void {
    const input =
      this.ele.nativeElement.querySelectorAll('input[type=text]')[0];
    const input$ = fromEvent(input, 'keyup').subscribe((event: any) => {
      if (event.keyCode === 13) {
        this.search();
      }
    });
  }

  onSubmit(): void {
    this.search();
  }

  search(): void {
    const query = omitBy(this.form.value, isEmpty);
    if (!isEmpty(query)) {
      this.router.navigate(['/search'], { queryParams: query });
    }
  }
}
