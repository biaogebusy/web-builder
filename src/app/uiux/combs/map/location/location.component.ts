import { Component, Input, OnInit } from '@angular/core';
import { AmapService } from '../../../../service/amap.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @Input() content: any;
  AMap: any;
  geocoder: any;

  constructor(private amapService: AmapService) {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.amapService.load().subscribe((AMap: any) => {
      this.AMap = AMap;
      this.geocoder = new AMap.Geocoder({
        city: this.content.city,
      });
    });
  }
}
