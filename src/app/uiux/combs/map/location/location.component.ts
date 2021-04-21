import { Component, Input, OnInit } from '@angular/core';
import { AmapService } from '../../../../service/amap.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @Input() content: any;

  constructor(private amapService: AmapService) {}

  ngOnInit(): void {}
}
