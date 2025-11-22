import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import type { IBtn } from '@core/interface/widgets/IBtn';
import { RouteService } from '@core/service/route.service';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BtnComponent implements OnInit {
  @Input() content: IBtn;
  routeService = inject(RouteService);
  @HostBinding('class.disabled') disabled = false;

  ngOnInit(): void {
    this.disabled = this.content.disabled ?? false;
  }

  onNav(event: any, content: any): void {
    this.routeService.toNavigate(event, content);
  }
}
