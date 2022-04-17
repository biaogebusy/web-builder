import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/service/api.service';

@Component({
  selector: 'app-sample-widgets',
  templateUrl: './sample-widgets.component.html',
  styleUrls: ['./sample-widgets.component.scss'],
})
export class SampleWidgetsComponent implements OnInit {
  samples: any;
  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    this.http
      .get(`${this.apiService.apiUrl}/assets/app/sample/widgets/widgets.json`)
      .subscribe((res: any) => {
        this.samples = res.body;
      });
  }
}
