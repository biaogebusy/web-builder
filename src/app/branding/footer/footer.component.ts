import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../service/utilities.service';
import { ScreenService } from '../../service/screen.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public utilities: UtilitiesService,
    public screen: ScreenService
  ) { }

  ngOnInit(): void {
  }

}
