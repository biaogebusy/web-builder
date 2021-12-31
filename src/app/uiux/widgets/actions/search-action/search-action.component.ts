import {
  Component,
  OnInit,
  Input,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormService } from '@core/service/form.service';
import { isEmpty, omitBy } from 'lodash';
import { fromEvent, Subscription } from 'rxjs';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-search-action',
  templateUrl: './search-action.component.html',
  styleUrls: ['./search-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchActionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: any;
  form: FormGroup;

  subscription = new Subscription();
  constructor(
    private router: Router,
    private formService: FormService,
    private ele: ElementRef,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    this.initForm(this.content.form);
  }

  initForm(form: any[]): void {
    this.form = this.formService.toFormGroup(form);
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      const input =
        this.ele.nativeElement.querySelectorAll('input[type=text]')[0];
      const input$ = fromEvent(input, 'keyup').subscribe((event: any) => {
        if (event.keyCode === 13) {
          this.search();
        }
      });
      this.subscription.add(input$);
    }
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
