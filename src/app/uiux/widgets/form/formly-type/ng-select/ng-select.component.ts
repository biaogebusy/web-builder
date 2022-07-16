import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NodeService } from '@core/service/node.service';
import { FieldType } from '@ngx-formly/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-formly-ng-select',
  templateUrl: './ng-select.component.html',
  styleUrls: ['./ng-select.component.scss'],
})
export class NgSelectFormlyComponent extends FieldType implements OnInit {
  opts: any[];
  content: any;
  formControl: FormControl;
  constructor(private nodeService: NodeService) {
    super();
  }

  ngOnInit(): void {
    this.content = this.field;
    if (this.content.api) {
      this.getOptionsFromApi();
    } else {
      this.opts = this.options as any;
    }
  }

  getOptionsFromApi(): void {
    this.nodeService
      .search(this.content.api || '', '')
      .pipe(
        catchError(() => {
          return of({
            rows: [],
          });
        })
      )
      .subscribe((res) => {
        this.opts = res.rows;
      });
  }
}
