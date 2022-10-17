import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IBtn } from '@core/interface/widgets/IBtn';
import { RouteService } from '@core/service/route.service';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnComponent implements OnInit {
  @Input() content: IBtn;
  constructor(private routService: RouteService) {}

  ngOnInit(): void {}

  onNav(event: any, content: any): void {
    this.routService.toNavigate(event, content);
  }
}
