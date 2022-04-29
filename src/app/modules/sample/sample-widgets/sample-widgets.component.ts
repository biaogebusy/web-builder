import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/service/api.service';
import { FormGroup } from '@angular/forms';
import { FormService } from '@core/service/form.service';

@Component({
  selector: 'app-sample-widgets',
  templateUrl: './sample-widgets.component.html',
  styleUrls: ['./sample-widgets.component.scss'],
})
export class SampleWidgetsComponent implements OnInit {
  samples: any;
  form: FormGroup;
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.http
      .get(`${this.apiService.apiUrl}/assets/app/sample/widgets/widgets.json`)
      .subscribe((res: any) => {
        this.samples = res.body;
        this.form = this.formService.toFormGroup(this.samples);
      });
  }
}
